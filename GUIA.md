# Guia: publicar o Soldados Socorristas de graça (Cloudflare)

Tempo estimado: 20 a 30 minutos. Você **não precisa de cartão de crédito** nem do Claude.

> **Aviso honesto.** Esta pasta foi desenvolvida e testada **no computador de desenvolvimento**, com o mesmo código do servidor rodando sobre um banco SQLite que simula o D1 (testes em `test/`). **Ela ainda não foi publicada na Cloudflare real.** Os passos abaixo são o caminho oficial (Wrangler), mas só você, com a sua conta, consegue concluir e confirmar a publicação. O passo 8 é um teste de verificação — faça-o antes de entregar o link aos alunos.

## O que você vai usar (tudo no plano gratuito)

| Peça | Serviço | Limite gratuito (conferido em 09/11/2026 na documentação da Cloudflare) |
|---|---|---|
| Site + API | Cloudflare Workers | 100.000 requisições/dia; 10 ms de CPU por requisição |
| Banco de dados | Cloudflare D1 | 5 milhões de linhas lidas/dia, 100 mil gravadas/dia, 5 GB |
| Contas e senhas | Código próprio (`src/worker.js`) | — |

Confira os limites atuais em <https://developers.cloudflare.com/workers/platform/pricing/> e <https://developers.cloudflare.com/d1/platform/pricing/>, pois podem mudar.

**Uso esperado:** o app consulta o servidor a cada 10 s enquanto a aba está aberta (30 s em segundo plano). Isso dá cerca de 360 requisições por hora por aluno conectado. Uma turma de 30 alunos usando 1 hora por dia gasta cerca de 11 mil requisições, bem abaixo das 100 mil. Se passar do limite diário, o app para de responder até as 21h (horário de Brasília, 00:00 UTC) e volta no dia seguinte.

## Passo 1 — Conta e ferramentas

1. Crie uma conta gratuita em <https://dash.cloudflare.com/sign-up> (e-mail + senha; confirme o e-mail).
2. Instale o **Node.js 20 ou mais novo**: <https://nodejs.org> (versão LTS).
3. Abra um terminal na pasta deste projeto (`soldados-independente`) e rode:
   ```
   npm install
   npx wrangler login
   ```
   O navegador abre; clique em **Allow** para autorizar.

## Passo 2 — (Opcional) Testar no seu computador antes

```
npm run build
node tools/dev-server.mjs
```
Abra <http://localhost:8787>. O código de instalação local é `codigo-de-teste`. Os dados ficam só na memória e somem ao fechar. Para testes automáticos: `npm test` (API) e veja `test/`.

## Passo 3 — Criar o banco de dados

```
npx wrangler d1 create soldados-db
```
A saída mostra algo como `database_id = "xxxxxxxx-xxxx-..."`. **Copie esse id** e cole em `wrangler.toml`, no lugar de `COLE-AQUI-O-ID-DO-BANCO`.

Depois crie as tabelas:
```
npm run db:init
```
(Se perguntar `Ok to proceed?`, responda `y`.)

## Passo 4 — Definir o código de instalação

Este código serve **só** para criar o primeiro administrador (a primeira vez que o site abrir). Escolha uma frase longa que só você conheça:
```
npx wrangler secret put SETUP_CODE
```
Digite o código quando pedir. Se o Wrangler perguntar se deve criar o Worker antes, responda `y`.

## Passo 5 — Publicar

```
npm run deploy
```
No final aparece o endereço público, no formato `https://soldados-socorristas.SEU-SUBDOMINIO.workers.dev`. **Esse é o link para compartilhar.**

## Passo 6 — Criar o administrador

1. Abra o link. Na primeira vez aparece **"Instalação: criar o administrador"**.
2. Informe o **código de instalação** (passo 4), seu nome, um nome de usuário e uma senha de pelo menos 8 caracteres.
3. Pronto: você entra no painel. A partir daqui o código de instalação não funciona mais.

## Passo 7 — Cadastrar alunos e professores

- **Alunos:** painel → **Contas** → *Cadastrar aluno* (ou *várias vezes de uma vez*, uma linha por aluno: `Nome;usuário;senha`). Anote e entregue usuário e senha inicial; o aluno troca a senha no primeiro acesso.
- **Esqueceu a senha:** não há e-mail. Em **Contas**, clique em *Redefinir senha* e entregue a nova senha inicial.
- **Professores:** duas formas.
  1. O professor abre o link, clica em *Sou professor — criar cadastro* e envia o pedido; você aprova em **Contas → Professores aguardando aprovação**.
  2. Você gera um **convite** (**Contas → Gerar convite**), envia o código `SS-XXXX-XXXX` e quem o usar no cadastro já entra aprovado (vale 7 dias, uma pessoa).
  Escolher "Professor" no cadastro **não dá acesso sozinho**.

## Passo 8 — Teste de verificação (faça antes de divulgar)

1. Crie um aluno de teste, entre com ele em outra janela anônima, troque a senha, crie o perfil e faça uma atividade.
2. Saia e entre de novo (de preferência de outro aparelho): o progresso deve continuar lá.
3. Entre como professor e confira que ele vê o aluno; confira que o aluno **não** vê a aba de professor.
4. Se o **login der erro 500 ou "Erro interno"**, veja o problema nº 1 abaixo.

## Problemas conhecidos e como resolver

**1. Erro interno ao criar o administrador ou entrar ("Exceeded CPU" nos registros).** O plano gratuito limita o tempo de CPU por requisição (10 ms). A proteção de senha usa PBKDF2 com 100.000 repetições (o máximo permitido pela Cloudflare). Se a sua conta não aguentar, abra `wrangler.toml`, troque `PBKDF2_ITER = "100000"` por um valor menor (por exemplo `"20000"`) e rode `npm run deploy` de novo. Menos repetições deixam a senha um pouco mais fácil de quebrar por quem roubasse o banco; por isso, use senhas longas. O valor é guardado por usuário: depois de mudar, contas já criadas continuam com o valor antigo; se elas falharem, redefina as senhas em **Contas**. (Não foi possível confirmar esse comportamento na Cloudflare real durante o desenvolvimento.)

**2. "Limite diário atingido".** Veja os limites acima. Dica: peça aos alunos para fecharem a aba quando terminarem.

**3. A conta do administrador foi esquecida.** Não há recuperação por e-mail. Como dono do banco, você pode redefinir pelo terminal: apague o administrador e refaça a instalação (o código de instalação volta a funcionar quando não existe administrador):
```
npx wrangler d1 execute soldados-db --remote --command "DELETE FROM users WHERE role='admin'"
```
Cuidado: isso apaga a conta de administrador (os dados dos alunos permanecem).

**4. Ver / exportar os dados.** `npx wrangler d1 export soldados-db --remote --output=backup.sql` gera uma cópia do banco. Faça backup de vez em quando.

## Domínio próprio (opcional)

No painel da Cloudflare: Workers & Pages → seu Worker → *Settings → Domains & Routes*. Um domínio próprio costuma ser pago (o `workers.dev` é gratuito).

## Limites de segurança (leia)

- Senhas são guardadas só como resumo PBKDF2 com sal; sessões usam cookie `HttpOnly`/`Secure`/`SameSite=Strict`; todas as permissões são verificadas **no servidor** (aluno só lê e grava o próprio progresso; professor não vira administrador; convites e aprovação só pelo administrador); há bloqueio temporário após tentativas erradas de senha.
- A **pontuação é calculada no aparelho do aluno** e enviada ao servidor. Um aluno com conhecimento técnico poderia adulterar a própria pontuação. Use avaliações presenciais e as notas dos professores como conferência.
- O conteúdo educacional é material-base que **não foi revisado por profissional de saúde**; não substitui o curso presencial.
- Foram coletados o mínimo de dados: nome de identificação (informado pelo professor), usuário, apelido e progresso. O ranking mostra apenas apelido, avatar e pontos.
- Não há e-mail, Google, Claude ou redes sociais. A única chamada externa do navegador é a fonte do Google Fonts (visual); se quiser eliminá-la, hospede as fontes você mesmo.
