# SPEC DE CONTEÚDO — Plataforma "Soldados Socorristas" (PT-BR)

Público: adolescentes e pré-adolescentes (11–17) do departamento Soldados de Cristo. Tom: direto, envolvente, sem ser infantil. Use "você". Frases curtas. Exemplos do cotidiano (escola, quadra, igreja, acampamento, casa, rua, parque).
Contexto Brasil: SAMU 192, Bombeiros 193, Polícia 190, Defesa Civil 199. Código Penal art. 135 (omissão de socorro).

## REGRAS DE CONTEÚDO (críticas)
- Conteúdo para SOCORRISTA LEIGO. Nada de medicação, procedimentos invasivos ou diagnóstico. Sempre: segurança da cena, acionar 192/193, condutas simples e seguras.
- Siga as diretrizes atuais (AHA/ERC 2020–2025, Cruz Vermelha, Ministério da Saúde). Onde organizações divergem, use a orientação mais conservadora para leigos e diga "siga o protocolo ensinado pelo instrutor presencial".
- NÃO invente dados, estatísticas, leis ou condutas. Se não tiver certeza, deixe de fora.
- Números-chave RCP adulto: compressões no centro do tórax, ritmo 100–120/min, profundidade ~5 cm (não mais que 6 cm), deixar o tórax voltar. Leigo não treinado: só compressões (RCP "só com as mãos"). Treinado: 30 compressões : 2 ventilações. Criança: ~1/3 do tórax; lactente: 2 dedos, ~4 cm. DEA: ligar, colar pás, seguir comandos de voz, afastar todos, choque se indicado, retomar RCP imediatamente.
- Engasgo grave (adulto/criança): 5 tapas nas costas alternados com 5 compressões abdominais (Heimlich); lactente: 5 tapas nas costas + 5 compressões torácicas com 2 dedos; se ficar inconsciente: 192 + RCP. Engasgo leve: estimular a tosse, não bater nas costas.
- Queimadura: resfriar com água corrente em temperatura ambiente por ~10–20 min; sem gelo, pasta de dente, manteiga, borra de café; não estourar bolhas; cobrir com pano limpo/filme plástico sem apertar; procurar atendimento em rosto, mãos, genitais, grande extensão, crianças, elétrica/química, 3º grau.
- Hemorragia: pressão direta com pano limpo, não retirar o curativo encharcado (colocar mais por cima), não remover objeto cravado, torniquete só como último recurso em hemorragia grave de membro, idealmente por quem treinou. Nariz: sentar, inclinar para frente, apertar as narinas ~10 min.
- Fraturas: imobilizar na posição encontrada, não tentar alinhar nem empurrar osso, cobrir fratura exposta com pano limpo, frio com pano entre gelo e pele, 192 se grave.
- Convulsão: proteger de ferimentos, afastar objetos, apoiar a cabeça, NÃO segurar, NÃO colocar nada na boca, cronometrar; depois virar de lado; 192 se > 5 min, 1ª vez, lesão, dificuldade de respirar, gestante, repetição. Desmaio: deitar, elevar pernas, afrouxar roupa, ventilar; se não acordar em ~1 min ou não respirar normal → 192/RCP.
- Choque elétrico: NÃO tocar na vítima em contato com a fonte; desligar a energia; afastar com material isolante seco só se necessário e treinado; 192/193; atenção a alta tensão (manter distância).
- Estado de choque: pele pálida/fria/suada, pulso rápido e fraco, respiração rápida, sonolência/ansiedade; 192, deitar, elevar pernas (se não houver trauma de cabeça/coluna/pernas ou dificuldade respiratória), aquecer, controlar sangramento visível, nada por via oral.
- Remoção/transporte: não mover sem necessidade; mover só se perigo iminente (fogo, desabamento, trânsito, gás); arrasto pelo eixo longo do corpo mantendo cabeça-pescoço-tronco alinhados; leigo NÃO retira capacete de motociclista salvo necessidade de via aérea/RCP e, se possível, só por quem foi treinado.
- Trauma: não mover suspeita de coluna; sinais de gravidade no TCE (vômitos, sonolência, confusão, convulsão, saída de líquido/sangue pelo ouvido/nariz); sem alimento/bebida.

## FORMATO DOS ARQUIVOS
Arquivo JS puro, strings com ASPAS DUPLAS (escape de aspas internas com \"), sem template literals, sem comentários gigantes. UTF-8 com acentos corretos.

### Módulos (arquivos mods_*.js)
Cada arquivo termina empurrando objetos: `(window.__MODS=window.__MODS||[]).push(mod1, mod2, ...);`
```
{
 id:"m1", n:1, title:"Introdução aos primeiros socorros", icon:"heart",   // icon: heart|eye|pulse|wind|shield|drop|heartpulse|ruler|flame|bolt|alert|move
 intro:"2–3 frases que prendem a atenção",
 objectives:["Verbo no infinitivo ...", ...],              // 3–5
 sections:[ {id:"m1s1", title:"", body:["parágrafo 40–90 palavras","..."], bullets:["..."] /*opcional*/, callout:{type:"tip"|"warn"|"info", text:"..."} /*opcional*/ } ],   // 4–5 seções, 2–3 parágrafos cada. Explique de verdade, com porquê.
 examples:[ {title:"", env:"escola"|"rua"|"casa"|"parque"|"quadra"|"campo"|"ar livre"|"comunidade", text:"situação cotidiana + o que fazer e por quê (60–100 palavras)"} ],  // 2
 summary:["5–6 pontos-chave curtos"],
 extras:[ {title:"", text:""} ],            // 3: ex. mito x verdade, checklist, curiosidade, para saber mais
 cards:[ {q:"termo/pergunta curta", a:"resposta curta (máx. 18 palavras)"} ],   // 6 flashcards; a resposta deve ser autoexplicativa
 activity:[ Q, Q, ... ],      // 6 questões (fixação): tipos mc, tf, short, match, seq, essay (um de cada)
 assessment:[ Q, ... ]        // 6 questões (avaliação, todas autocorrigíveis): mc, mc, mc, tf, err, short
}
```
### Questões (Q)
Comuns: `id` (activity: "m1a1".."m1a6"; assessment: "m1s1".."m1s6"; use o id do módulo), `type`, `q` (enunciado), `exp` (explicação educativa 1–2 frases, OBRIGATÓRIA).
- mc: `options:[4 textos]`, `answer:<índice 0-3>`. Distribua a resposta correta entre os índices (não sempre o mesmo). Distratores plausíveis.
- tf: `q` é uma afirmação; `answer:true|false`.
- short: `answers:["variações aceitas, minúsculas, sem acento, trechos curtos"]` (a resposta do aluno é normalizada e aceita se contiver algum trecho). Pergunta deve ter resposta de 1–3 palavras.
- essay: `q` pede resposta discursiva curta; `exp` = critérios/pontos esperados para o professor corrigir.
- match: `pairs:[["esquerda","direita"], ...]` 3–5 pares.
- seq: `items:["passo 1","passo 2",...]` já na ORDEM CORRETA (4–5 itens, curtos). O app embaralha.
- err: "Encontre o erro": `items:[4 afirmações]`, `answer:<índice da afirmação ERRADA>`; q pede para achar a afirmação incorreta.

### Simulações (arquivos sims_*.js)
`(window.__SIMS=window.__SIMS||[]).push(sim, ...);`
```
{
 id:"s01", title:"", env:"home"|"street"|"school"|"park"|"court"|"field"|"outdoor"|"community", module:"m1", theme:"Assunto curto", variation:1, diff:1|2|3,
 intro:"3–4 frases apresentando a situação em 2ª pessoa (você está...)",
 characters:[ {name:"Lucas", role:"colega, 13 anos"} ],     // 2–4
 problem:"uma frase: qual é a emergência",
 items:[ {id:"a", kind:"person_down", x:50, y:70, label:"Lucas", note:"o que você percebe ao observar (1–2 frases)", key:true} ],   // 5–7 itens observáveis; ≥3 com key:true (informações essenciais p/ decidir ou riscos); distratores com key:false
 nodes:{
   start:{ text:"pergunta/cena de decisão", choices:[ {t:"ação", next:"n2", q:"best"|"ok"|"bad", fb:"feedback educativo (1–2 frases, explica POR QUÊ)", story:"consequência narrativa imediata (1–2 frases)"}, ...2–3 escolhas ] },
   n2:{...}, n3:{...},
   endA:{ end:true, tone:"good"|"ok"|"bad", title:"", text:"desfecho (2–3 frases) + lição" }
 },
 safety:"uma linha: lembrete de segurança/educativo (nunca praticar em pessoas reais)"
}
```
Regras das sims: 3–4 níveis de decisão ao longo do caminho; cada escolha tem `next` válido; pelo menos 3 finais (good/ok/bad); exatamente uma escolha "best" por nó (as demais ok/bad); escolhas "bad" nunca ensinam algo perigoso como se fosse certo — o feedback explica o risco. Evitar sempre a mesma posição para a melhor escolha. Itens: x entre 8 e 92, y entre 50 e 86 (chão), espaçamento mínimo ~14 em x entre itens para não sobrepor. `kind` válido: person_stand, person_down, person_sit, child_stand, child_down, wire, puddle, ball, car, bike, bike_down, tree, bench, swing, pot, stove, aed, kit, helmet, rock, backpack, sign, door, table, chair, cone, fire, glass, stairs, phone, bottle, outlet, crowd, ambulance. Pode usar `color` ("#hex") em itens de pessoa para a camiseta.

## VALIDAÇÃO
Rode `node /home/claude/plat/validate.js <arquivo.js>` e corrija até não haver erros. Não crie outros arquivos além do seu.
