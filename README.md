# Soldados Socorristas — versão independente

Plataforma gamificada de primeiros socorros (módulos, atividades, minigames, simulações, conquistas, avatares, ranking, painel de professores, relatórios) com **contas próprias de usuário e senha** e **banco de dados compartilhado**, para hospedar de graça na Cloudflare (Workers + D1). Não depende do Claude.

```
public/index.html     → o aplicativo (gerado por frontend/build.sh)
frontend/             → código-fonte do aplicativo (JS/CSS) e conteúdo dos 12 módulos e 14 simulações
src/worker.js         → servidor: contas, sessões, permissões e API de dados
schema.sql            → tabelas do banco D1
wrangler.toml         → configuração da hospedagem
tools/                → servidor de testes local (D1 simulado)
test/                 → testes automáticos (API e ponta a ponta no navegador)
GUIA.md               → passo a passo para publicar
```

Comandos: `npm run build` (gera `public/index.html`), `npm run deploy`, `npm test`. Comece pelo **GUIA.md**.
