(window.__SIMS=window.__SIMS||[]).push(
{
 id:"s01", title:"Vizinho caído no corredor", env:"home", module:"m1", theme:"Pedir ajuda e ligar 192", variation:1, diff:1,
 intro:"Você volta da escola e, ao sair do elevador no 4º andar, vê o Seu Antônio, vizinho de 78 anos, caído no chão do corredor. Ele mora sozinho. A porta do apartamento dele está aberta e não há mais ninguém por perto. Seu coração dispara, mas você sabe que o primeiro passo é manter a calma.",
 characters:[{name:"Seu Antônio",role:"vizinho idoso, 78 anos"},{name:"Seu Jorge",role:"porteiro do prédio"},{name:"Dona Marta",role:"vizinha do 3º andar"}],
 problem:"Idoso encontrado caído no corredor, sem reagir, sem ninguém por perto.",
 items:[
  {id:"a",kind:"person_down",x:46,y:72,label:"Seu Antônio",note:"Está deitado de lado, de olhos fechados e muito pálido. Você não sabe há quanto tempo ele está ali.",key:true},
  {id:"b",kind:"bottle",x:62,y:80,label:"Frasco de remédio",note:"Um frasco caiu perto da mão dele. Leigo não dá remédio, mas o nome do frasco pode ajudar a equipe do SAMU depois.",key:true},
  {id:"c",kind:"door",x:12,y:62,label:"Porta aberta",note:"É o apartamento dele. Dá para ver que ninguém mais está lá dentro.",key:false},
  {id:"d",kind:"stairs",x:78,y:66,label:"Escada",note:"Ele está perto dos degraus. Pode ter caído da escada, então não dá para saber se machucou cabeça ou quadril.",key:true},
  {id:"e",kind:"phone",x:90,y:82,label:"Seu celular",note:"Está na sua mão, com sinal. Você pode ligar para o 192 agora mesmo.",key:true},
  {id:"f",kind:"chair",x:28,y:82,label:"Cadeira do corredor",note:"Uma cadeira simples. Não é para ele ser colocado nela: sentado, ele pode piorar.",key:false}
 ],
 nodes:{
  start:{text:"Seu Antônio está caído e de olhos fechados. O que você faz primeiro?",choices:[
   {t:"Pegar o comprimido do frasco e colocar na boca dele para ele melhorar.",next:"nR",q:"bad",fb:"Leigo nunca dá remédio: você não sabe o que ele tem e uma pessoa desacordada pode se engasgar.",story:"Você hesita, ainda com o comprimido na mão. Ele continua sem reagir e você percebe que perdeu tempo."},
   {t:"Chamar alto pelo nome, tocar de leve os ombros e gritar por ajuda.",next:"n2",q:"best",fb:"Primeiro confirme se ele reage e peça ajuda em voz alta: ninguém deve socorrer sozinho quando pode dividir a tarefa.",story:"Ele não responde. Seu Jorge, o porteiro, ouve seu grito e sobe correndo pelas escadas."},
   {t:"Descer correndo para chamar o porteiro, sem olhar como ele está.",next:"n2",q:"ok",fb:"Chamar ajuda é bom, mas você não verificou se ele reage ou respira. Essa informação é essencial para quem atender o 192.",story:"Você volta com Seu Jorge e só então percebe que ainda não sabe dizer se Seu Antônio está respirando."}
  ]},
  nR:{text:"Você guarda o comprimido e percebe o erro. Seu Antônio segue imóvel e você está sozinho. Qual é o próximo passo?",choices:[
   {t:"Ligar para o 192 e dizer que ele está caído e sem reagir.",next:"n3",q:"ok",fb:"Acionar o 192 é certo, mas antes vale chamar alguém para ficar com você e checar a respiração dele.",story:"A atendente começa a fazer perguntas e você percebe que não olhou a respiração. Seu Jorge chega nessa hora."},
   {t:"Tentar levantar o Seu Antônio e levá-lo para dentro do apartamento.",next:"endBad",q:"bad",fb:"Mover sem necessidade pode agravar uma lesão de coluna, quadril ou cabeça. Ele pesa mais que você e pode cair de novo.",story:"Ao puxar o braço dele, ele solta um gemido de dor. Você se assusta e percebe que pode tê-lo machucado."},
   {t:"Gritar por ajuda, tocar os ombros dele e chamar pelo nome.",next:"n2",q:"best",fb:"Voltar ao passo certo corrige o rumo: checar se ele reage e chamar mais gente é a base de todo socorro.",story:"Seu Jorge aparece na escada. Juntos, vocês notam que Seu Antônio não responde."}
  ]},
  n2:{text:"Seu Antônio não responde. Seu Jorge está com você. O peito dele sobe e desce devagar, mas ele está pálido e suado. O que fazer agora?",choices:[
   {t:"Esperar uns 10 minutos para ver se ele acorda sozinho.",next:"n3",q:"ok",fb:"Uma pessoa inconsciente precisa de avaliação médica. Esperar sem avisar o SAMU pode atrasar um atendimento importante.",story:"Cinco minutos se passam e nada muda. Seu Jorge diz que não gostou e sugere ligar para o 192."},
   {t:"Pedir ao Seu Jorge que ligue para o 192 e ficar ao lado, observando a respiração dele.",next:"n3",q:"best",fb:"Dividir tarefas é eficiente: um liga, outro observa. Diga endereço, andar, idade aproximada e que ele respira, mas não reage.",story:"Seu Jorge liga e passa o endereço e o andar. A atendente avisa que a ambulância está a caminho e pede que vocês fiquem com ele."},
   {t:"Dar um pouco de água com açúcar para ele recuperar a cor.",next:"n3",q:"bad",fb:"Nada pela boca para quem está desacordado: ele pode engasgar ou aspirar a água para os pulmões.",story:"Seu Jorge segura seu braço antes de você fazer isso e explica o risco. Você respira fundo e guarda o copo."}
  ]},
  n3:{text:"O 192 está a caminho. A atendente pediu que vocês aguardem com ele. O que você faz enquanto a ambulância não chega?",choices:[
   {t:"Ficar ao lado, observar a respiração, cobrir com uma manta e pedir que alguém abra a porta do prédio para o SAMU.",next:"endGood",q:"best",fb:"Observar, aquecer e facilitar a chegada do SAMU é o que o leigo pode fazer de melhor. O frasco pode ser entregue à equipe.",story:"Dona Marta traz um cobertor e Seu Jorge espera na portaria. Quando a equipe chega, vocês entregam o frasco e explicam o que viram."},
   {t:"Sentá-lo na cadeira do corredor para ele ficar mais confortável.",next:"endBad",q:"bad",fb:"Sentar uma pessoa desacordada pode obstruir as vias aéreas e agravar uma lesão. Mantenha-a no chão, como está.",story:"Seu Antônio escorrega para o lado e vocês precisam deitá-lo de novo. Você entende que mexer sem necessidade foi um erro."},
   {t:"Descer para esperar o SAMU na calçada e deixá-lo sozinho com a vizinha.",next:"endOk",q:"ok",fb:"Esperar o SAMU na entrada é útil, mas deixar a vítima sem ninguém que observe a respiração não é ideal. Idealmente, outra pessoa faz isso.",story:"Dona Marta fica com ele enquanto você guia a equipe. Tudo dá certo, mas vocês notam que poderia ter sido mais organizado."}
  ]},
  endGood:{end:true,tone:"good",title:"Ajuda chegou a tempo",text:"O SAMU levou Seu Antônio ao hospital e a família foi avisada. Você pediu ajuda, acionou o 192 e não deu remédio nem mexeu no corpo dele. Esse cuidado simples pode salvar uma vida."},
  endOk:{end:true,tone:"ok",title:"Deu certo, mas dava para melhorar",text:"O SAMU assumiu o atendimento e ele foi levado. Em emergências, avise o 192 cedo e sempre deixe alguém observando a vítima. Faltou pouco para ser perfeito."},
  endBad:{end:true,tone:"bad",title:"Mexer demais piorou a situação",text:"Mover ou posicionar mal a vítima pode agravar lesões. O socorrista leigo chama o 192, observa e protege; quem trata e remove é a equipe treinada."}
 },
 safety:"Nunca pratique em pessoas reais. Na vida real, ligue 192 e siga as orientações da atendente; não dê remédios nem mova a vítima sem necessidade."
},
{
 id:"s02", title:"Acidente na esquina", env:"street", module:"m2", theme:"Segurança da cena e chamada ao 192", variation:1, diff:2,
 intro:"Você e a Camila voltam do culto de jovens e param na esquina da Rua das Palmeiras. Um carro acaba de bater em uma bicicleta que atravessava o cruzamento. A ciclista caiu no asfalto e o motorista saiu do carro, abalado. Outros carros continuam passando devagar.",
 characters:[{name:"Bia",role:"ciclista, 15 anos"},{name:"Sr. Hélio",role:"motorista do carro"},{name:"Camila",role:"sua amiga, 14 anos"}],
 problem:"Colisão entre carro e bicicleta, com a ciclista caída na via e trânsito ainda em movimento.",
 items:[
  {id:"a",kind:"person_down",x:36,y:72,label:"Bia",note:"Está deitada no asfalto, consciente, dizendo que dói o pescoço. O capacete está rachado.",key:true},
  {id:"b",kind:"bike_down",x:20,y:80,label:"Bicicleta",note:"A roda está torta, jogada perto da ciclista. Não é prioridade agora.",key:false},
  {id:"c",kind:"car",x:60,y:66,label:"Carro",note:"Está parado de lado na via. Faixas de carros ainda passam perto.",key:true},
  {id:"d",kind:"person_stand",x:76,y:76,label:"Sr. Hélio",note:"É o motorista. Está em pé, nervoso, e diz que sente dor no pescoço também.",key:true},
  {id:"e",kind:"cone",x:48,y:84,label:"Cone / sinalização",note:"Há um cone caído na rua. Seria útil para sinalizar a cena, se alguém experiente o usar com segurança.",key:false},
  {id:"f",kind:"crowd",x:90,y:70,label:"Curiosos",note:"Pessoas se aproximam para olhar e filmar. Algumas já se oferecem para ajudar.",key:false}
 ],
 nodes:{
  start:{text:"Você vê a ciclista caída e carros se movendo no cruzamento. O que faz primeiro?",choices:[
   {t:"Correr até a Bia, no meio do cruzamento, para ver se ela está bem.",next:"nR",q:"bad",fb:"Entrar na pista sem olhar o trânsito pode causar outro acidente e outra vítima: você. Segurança da cena vem primeiro.",story:"Um carro buzina e freia a poucos metros de você. Seu coração dispara e você recua para a calçada."},
   {t:"Ligar para o 192 correndo, sem olhar a rua nem a cena.",next:"n2",q:"ok",fb:"Chamar ajuda é essencial, mas olhar a cena antes de qualquer coisa evita que você vire uma vítima. Dá para fazer as duas coisas em sequência.",story:"Enquanto você liga, percebe que a atendente pergunta onde exatamente estão. Você olha ao redor para confirmar."},
   {t:"Parar na calçada, olhar os riscos, pedir à Camila que ligue para o 192 e pedir aos motoristas para reduzir e parar.",next:"n2",q:"best",fb:"Avaliar a cena e dividir tarefas protege você e agiliza a ajuda. Só se aproxime quando o trânsito estiver controlado.",story:"Os carros reduzem e param. Camila liga enquanto você olha a cena e vê só duas vítimas."}
  ]},
  nR:{text:"Você está de volta à calçada, respirando fundo. O trânsito continua passando. O que faz agora?",choices:[
   {t:"Esperar o trânsito parar sozinho.",next:"endBad",q:"bad",fb:"Ficar parado enquanto a vítima está no meio da via, sem pedir ajuda nem acionar o 192, aumenta o risco de novo atropelamento.",story:"Os minutos passam e um carro quase passa por cima da bicicleta. Você se dá conta de que precisava agir."},
   {t:"Pedir a pessoas na calçada que sinalizem e parem os carros e acionar o 192 antes de se aproximar.",next:"n2",q:"best",fb:"Delegar a sinalização e o 192 enquanto você se mantém seguro é a conduta correta. Só vá até a vítima quando a via estiver segura.",story:"Duas pessoas acenam para os motoristas e os carros param. Camila liga para o 192."},
   {t:"Ligar para o 192 do lugar onde está e depois atravessar.",next:"n2",q:"ok",fb:"Ligar é bom, mas atravessar sem confirmar que os carros pararam repete o risco. Espere a sinalização.",story:"Enquanto fala com o 192, você vê dois motoristas parando para ajudar. Fica claro que atravessar naquele momento seria arriscado."}
  ]},
  n2:{text:"A atendente do 192 atende. O que é mais importante dizer?",choices:[
   {t:"Dizer o local exato (rua e esquina), que foi uma colisão carro e bicicleta, quantas vítimas e como estão, e não desligar até ela autorizar.",next:"n3",q:"best",fb:"Local preciso, tipo de acidente, número de vítimas e estado delas permitem enviar o recurso certo. Fique na linha até a atendente liberar.",story:"A atendente repete o endereço, confirma duas vítimas e diz que a ambulância está a caminho."},
   {t:"Dizer apenas que houve um acidente e desligar para ajudar rápido.",next:"n3",q:"bad",fb:"Informações incompletas atrasam o socorro e a atendente pode precisar de mais dados. Desligar sem autorização é um erro comum.",story:"Camila liga de novo para completar as informações. Perdeu-se tempo que poderia ter sido usado melhor."},
   {t:"Dar o local e o número de vítimas, mas não dizer nada sobre dor no pescoço nem estado delas.",next:"n3",q:"ok",fb:"Local e vítimas são ótimos, mas o estado (consciência, dor no pescoço) ajuda a priorizar o atendimento.",story:"A atendente pergunta sobre o estado delas. Você responde e ela faz outras orientações."}
  ]},
  n3:{text:"Com o trânsito parado, você vai até a Bia. Ela está consciente, reclama de dor no pescoço e o capacete está rachado. Qual a melhor conduta?",choices:[
   {t:"Tirar o capacete e sentá-la no meio-fio para ela respirar melhor.",next:"endBad",q:"bad",fb:"Com dor no pescoço e capacete rachado, mexer na cabeça ou sentar pode agravar uma lesão de coluna. O capacete só sai se houver necessidade de via aérea, e idealmente por quem tem treino.",story:"Ela grita de dor quando você mexe. Camila segura seu braço e vocês param, assustados."},
   {t:"Pedir que ela fique parada, manter a cabeça dela alinhada com as mãos, conversar e aguardar o SAMU sem tirar o capacete.",next:"endGood",q:"best",fb:"Imobilizar e acalmar é o que o leigo pode fazer. Não mexer na coluna nem remover capacete sem necessidade.",story:"Você segura a cabeça dela com cuidado e conversa. Bia chora, mas fica quieta. O SAMU chega em poucos minutos."},
   {t:"Ficar ao lado conversando, mas pedir que ela tente mexer o pescoço para ver se dói.",next:"endOk",q:"ok",fb:"A conversa acalma, mas pedir movimento do pescoço pode piorar uma lesão. Peça que ela fique parada.",story:"Bia ensaia um movimento e faz uma careta. Você corrige na hora e pede que ela pare."}
  ]},
  endGood:{end:true,tone:"good",title:"Cena segura e socorro organizado",text:"A equipe do SAMU imobilizou Bia e levou os dois ao hospital. Você protegeu a cena, passou informações claras e evitou mexer demais. Em acidente, segurança e informação vêm antes de qualquer outra coisa."},
  endOk:{end:true,tone:"ok",title:"Bom socorro, com ajustes",text:"A ajuda chegou e as vítimas foram atendidas. Lembre: informações completas ao 192 e evitar movimentos da vítima fazem diferença. Revise as etapas e tente de novo."},
  endBad:{end:true,tone:"bad",title:"Pressa sem cuidado",text:"Ações apressadas, como entrar na via sem segurança ou mexer na coluna, podem criar novas vítimas ou agravar lesões. Primeiro segurança, depois chamar o 192, depois cuidar."}
 },
 safety:"Na vida real, nunca entre na pista sem trânsito controlado e não retire capacete de motociclista ou ciclista sem necessidade. Ligue 192 e, se houver risco, 193."
},
{
 id:"s03", title:"Convulsão no pátio", env:"school", module:"m3", theme:"Convulsão", variation:1, diff:2,
 intro:"É a hora do recreio e o pátio está cheio. De repente, o Gabriel, seu colega de turma, cai no chão e seu corpo começa a se sacudir sem controle. Alguns alunos gritam e outros se aproximam para olhar. A inspetora está do outro lado do pátio.",
 characters:[{name:"Gabriel",role:"colega de turma, 14 anos"},{name:"Letícia",role:"sua amiga, 14 anos"},{name:"Profa. Sandra",role:"inspetora do pátio"}],
 problem:"Colega tem uma convulsão no pátio, diante de muitos alunos.",
 items:[
  {id:"a",kind:"person_down",x:44,y:72,label:"Gabriel",note:"Está no chão, com o corpo rígido e tremendo. Os olhos estão revirados e ele não responde.",key:true},
  {id:"b",kind:"bench",x:20,y:68,label:"Banco de concreto",note:"A quina do banco está perto da cabeça dele. Há risco de machucar.",key:true},
  {id:"c",kind:"backpack",x:62,y:80,label:"Mochila",note:"Uma mochila macia. Dá para dobrar a mochila e apoiar a cabeça dele, sem forçar.",key:true},
  {id:"d",kind:"crowd",x:80,y:68,label:"Alunos curiosos",note:"Estão tão perto que quase pisam nele. Alguns filmam com o celular.",key:false},
  {id:"e",kind:"ball",x:12,y:82,label:"Bola",note:"Uma bola de futebol parada. Não é importante agora.",key:false},
  {id:"f",kind:"person_stand",x:90,y:80,label:"Profa. Sandra",note:"A inspetora está vindo do outro lado do pátio. Você pode chamar por ela.",key:false}
 ],
 nodes:{
  start:{text:"Gabriel convulsiona no chão e há gente em volta. O que você faz primeiro?",choices:[
   {t:"Segurar os braços e pernas dele e colocar a carteira na boca para ele não morder a língua.",next:"nR",q:"bad",fb:"Nunca segure nem coloque nada na boca: pode quebrar dentes, machucar a boca e causar engasgo. A convulsão não pode ser parada à força.",story:"Ele se debate ainda mais e você percebe que não deu certo. Letícia grita que você precisa parar."},
   {t:"Chamar a inspetora e ficar olhando, sem tocar nem afastar ninguém.",next:"n2",q:"ok",fb:"Avisar um adulto é bom, mas você pode proteger o Gabriel enquanto isso: afastar objetos e apoiar a cabeça.",story:"A inspetora chega, mas Gabriel segue perto do banco. Vocês perdem alguns segundos importantes."},
   {t:"Pedir que a Letícia afaste os curiosos, tirar objetos da frente, apoiar a cabeça com a mochila e anotar a hora.",next:"n2",q:"best",fb:"Proteger de lesões, não segurar nem pôr nada na boca e cronometrar são os pilares. O tempo da convulsão é dado importante para o SAMU.",story:"Letícia afasta a turma e você dobra a mochila sob a cabeça dele. O relógio marca o início: 12h10."}
  ]},
  nR:{text:"Você largou o Gabriel. A convulsão continua e há uma pequena marca de sangue no canto da boca dele. O que faz agora?",choices:[
   {t:"Tentar abrir a boca dele para tirar o que colocou.",next:"endBad",q:"bad",fb:"Forçar a boca durante a convulsão é perigoso: pode machucar você e ele. Aguarde a convulsão passar.",story:"Ele morde sua mão e você se assusta. A inspetora afasta vocês dois e assume."},
   {t:"Afastar objetos, apoiar a cabeça com a mochila e cronometrar.",next:"n2",q:"best",fb:"Voltar ao caminho certo corrige: proteger sem restringir é o que importa. A marca de sangue provavelmente é da língua ou do lábio.",story:"Você apoia a cabeça de Gabriel e pede ajuda. A Profa. Sandra chega e confirma que vai ligar para a coordenação."},
   {t:"Gritar para alguém trazer água para ele beber.",next:"n2",q:"ok",fb:"Nada pela boca: durante e logo após a convulsão ele pode engasgar. O melhor é proteger e aguardar.",story:"A inspetora diz que não pode dar água agora. Vocês voltam a proteger a cabeça dele."}
  ]},
  n2:{text:"Após cerca de 2 minutos, os tremores param. Gabriel respira de forma ruidosa, está sonolento e não responde direito. O que fazer?",choices:[
   {t:"Sacudir os ombros dele e gritar para ele acordar logo.",next:"n3",q:"bad",fb:"Sacudir não ajuda e pode piorar a confusão. Depois da convulsão, a pessoa fica sonolenta; o necessário é manter a respiração livre.",story:"Gabriel resmunga e não acorda. Letícia pede que você pare e ajude a virá-lo."},
   {t:"Deixar deitado de barriga para cima e esperar acordar.",next:"n3",q:"ok",fb:"Melhor do que nada, mas de barriga para cima ele pode engasgar com saliva ou vômito. Vire de lado.",story:"Ele faz ruídos na garganta e você vê saliva escorrendo. Você percebe que precisa virá-lo."},
   {t:"Virar de lado (posição de recuperação), conferir se respira bem e falar com calma.",next:"n3",q:"best",fb:"Virar de lado mantém a via aérea livre e evita aspiração de saliva ou vômito. Conferir a respiração e acalmar é o que o leigo faz.",story:"Você vira Gabriel com cuidado e ele respira melhor. A inspetora anota o horário do fim: 12h12."}
  ]},
  n3:{text:"Ninguém sabe se o Gabriel tem epilepsia. Foi a primeira vez que vocês veem isso. Ele está confuso, mas respira bem. Qual é a decisão?",choices:[
   {t:"Acionar o 192, avisar a família e ficar com ele até a ajuda chegar.",next:"endGood",q:"best",fb:"Primeira convulsão (ou convulsão sem histórico conhecido) exige avaliação médica. Acionar o 192 e avisar os responsáveis é o caminho seguro.",story:"O SAMU chega, avalia o Gabriel e o leva ao hospital com a mãe. A inspetora elogia o jeito rápido da turma."},
   {t:"Mandar o Gabriel sozinho para a enfermaria, assim que ele acordar.",next:"endOk",q:"ok",fb:"Pessoa confusa não deve ir sozinha. Alguém precisa acompanhá-la, e a primeira convulsão precisa de avaliação médica.",story:"A inspetora o acompanha até a enfermaria e liga para a família. O atendimento atrasou um pouco."},
   {t:"Dar água e comida para ele recuperar as forças e voltar para a sala.",next:"endBad",q:"bad",fb:"Nada por via oral até estar totalmente acordado, e mesmo depois a primeira convulsão exige avaliação médica. Voltar à aula sem avaliação é arriscado.",story:"Gabriel engasga e tosse com a água. A inspetora interrompe e chama o SAMU."}
  ]},
  endGood:{end:true,tone:"good",title:"Proteger, cronometrar, pedir ajuda",text:"Você não segurou, não pôs nada na boca, cronometrou e virou de lado. A equipe médica elogiou o socorro. Lembre: proteja, cronometre e chame o 192 em caso de primeira convulsão."},
  endOk:{end:true,tone:"ok",title:"Bom, mas com falhas",text:"O Gabriel foi atendido, mas faltaram passos importantes, como virar de lado ou acionar o 192 logo. Revise o roteiro da convulsão."},
  endBad:{end:true,tone:"bad",title:"Conduta que podia machucar",text:"Segurar, pôr objeto na boca ou dar água durante ou após a convulsão pode causar lesão e engasgo. Proteja o corpo e deixe a convulsão passar."}
 },
 safety:"Nunca simule convulsão em pessoas reais e nunca coloque nada na boca de quem convulsiona. Em dúvida, ligue 192."
},
{
 id:"s04", title:"Desmaio na quadra", env:"court", module:"m3", theme:"Síncope (desmaio)", variation:1, diff:2,
 intro:"Sábado de campeonato interno na quadra da igreja, sob um sol forte. Você está na arquibancada quando o Thiago, de 16 anos, cambaleia durante o jogo e cai de repente. O técnico está do outro lado da quadra. Os jogadores param e fazem um círculo apertado ao redor dele.",
 characters:[{name:"Thiago",role:"jogador, 16 anos"},{name:"Prof. Marcos",role:"técnico do time"},{name:"Júlia",role:"colega, 15 anos"}],
 problem:"Jogador desmaia na quadra em dia muito quente.",
 items:[
  {id:"a",kind:"person_down",x:44,y:72,label:"Thiago",note:"Está de barriga para cima, pálido, suado e de olhos fechados. Ele não responde ao nome.",key:true},
  {id:"b",kind:"crowd",x:66,y:70,label:"Jogadores em volta",note:"Eles estão muito próximos e bloqueiam o ar. É melhor pedir que se afastem.",key:true},
  {id:"c",kind:"bottle",x:82,y:80,label:"Garrafa de água",note:"Uma garrafa de água. Ela não deve ser usada enquanto ele estiver desacordado.",key:false},
  {id:"d",kind:"backpack",x:22,y:80,label:"Mochila",note:"Uma mochila que pode servir para elevar as pernas dele, se necessário.",key:true},
  {id:"e",kind:"ball",x:10,y:70,label:"Bola",note:"A bola rolou para o canto. Ela não interessa agora.",key:false},
  {id:"f",kind:"bench",x:90,y:66,label:"Banco / sombra",note:"Há sombra perto do banco. Dá para levar um pouco de ar e sombra sem mover a pessoa.",key:false}
 ],
 nodes:{
  start:{text:"Thiago caiu e está de olhos fechados. O que você faz primeiro?",choices:[
   {t:"Chamar o nome dele, tocar nos ombros, checar a respiração (olhando o peito) e pedir ao técnico que venha.",next:"n2",q:"best",fb:"Checar se reage e respira vem antes de tudo e decide o próximo passo. Pedir ajuda ao técnico divide as tarefas.",story:"Ele não responde, mas o peito sobe e desce normalmente. O técnico vem correndo."},
   {t:"Jogar água fria no rosto dele para acordar.",next:"nR",q:"bad",fb:"Água no rosto de alguém desacordado pode ir parar nas vias aéreas e não é o tratamento correto. O foco é checar respiração e posicionar.",story:"Thiago tosse e continua sem acordar. Júlia pede que você pare e verifique a respiração."},
   {t:"Chamar o técnico e esperar ele decidir, sem checar nada.",next:"n2",q:"ok",fb:"Chamar um adulto ajuda, mas checar se ele reage e respira é rápido e essencial para qualquer decisão.",story:"O técnico chega e pergunta: 'Ele está respirando?'. Você percebe que não tinha olhado."}
  ]},
  nR:{text:"Já se passou cerca de 1 minuto. Thiago respira, mas ainda não acorda. O que fazer agora?",choices:[
   {t:"Sacudir ele com força e dar tapas no rosto.",next:"endBad",q:"bad",fb:"Sacudir e dar tapas não adianta e pode machucar. Se não acorda em cerca de 1 minuto, precisa de ajuda médica.",story:"Júlia afasta suas mãos. O técnico percebe que o caso é sério e vai ligar para o SAMU."},
   {t:"Esperar mais uns 5 minutos para ver se ele acorda.",next:"endOk",q:"ok",fb:"Se não acorda em cerca de 1 minuto, acione o 192. Esperar demais é arriscado.",story:"O técnico chama o SAMU, que chega e assume. O atendimento atrasou."},
   {t:"Pedir para ligarem para o 192, conferir a respiração e, se parar de respirar normalmente, iniciar compressões e pedir o DEA.",next:"endOk",q:"best",fb:"Se não acorda em cerca de 1 minuto ou não respira normalmente, aciona-se o 192 e, se for o caso, inicia-se RCP. Você corrigiu o rumo.",story:"O SAMU chega e assume o atendimento. Thiago volta a reagir ao longo do caminho para o hospital, mas o tempo perdido pesou."}
  ]},
  n2:{text:"Thiago respira, mas continua inconsciente, pálido e suado. O que fazer a seguir?",choices:[
   {t:"Sentá-lo no banco para ele ficar com a cabeça mais alta.",next:"n3",q:"bad",fb:"Sentar quem desmaiou diminui o fluxo de sangue para o cérebro. O certo é deitar e elevar as pernas.",story:"Ele escorrega para o lado. Júlia ajuda a deitar de novo e explica que o melhor é ficar deitado."},
   {t:"Deitá-lo de barriga para cima, elevar as pernas, afrouxar a roupa e pedir que os jogadores se afastem para ventilar.",next:"n3",q:"best",fb:"Deitar e elevar as pernas ajuda o sangue a voltar ao cérebro; afrouxar a roupa e dar espaço melhora a ventilação.",story:"Júlia levanta as pernas dele apoiadas na mochila. Em menos de um minuto, os olhos de Thiago começam a se abrir."},
   {t:"Deitá-lo, mas manter o círculo de jogadores em volta e as pernas no chão.",next:"n3",q:"ok",fb:"Deitar é bom, mas sem elevar as pernas e sem ventilação a recuperação é mais lenta. Peça espaço e eleve as pernas.",story:"O ambiente continua abafado. Thiago demora mais para reagir, e você percebe o que faltou."}
  ]},
  n3:{text:"Thiago abre os olhos, confuso, e diz que quer se levantar e beber água. O que você faz?",choices:[
   {t:"Mantê-lo deitado alguns minutos, levantar devagar e oferecer água só quando estiver bem acordado. Avisar os responsáveis.",next:"endGood",q:"best",fb:"Voltar a ficar em pé rápido pode causar novo desmaio. Água só quando estiver totalmente acordado e consciente, e é bom avisar a família e procurar avaliação.",story:"Thiago bebe água aos poucos, já sentado, e o técnico liga para os pais dele. Ele fica de fora do jogo e passa por avaliação."},
   {t:"Deixar ele se levantar de uma vez e voltar ao jogo.",next:"endBad",q:"bad",fb:"Levantar rápido pode causar novo desmaio, e voltar ao jogo sem avaliação é arriscado depois de um desmaio.",story:"Ao ficar em pé, Thiago fica tonto e cai de novo. Desta vez, o técnico precisa segurá-lo."},
   {t:"Sentá-lo de uma vez e dar água, mas ficar ao lado.",next:"endOk",q:"ok",fb:"Ficar ao lado ajuda, mas levantar de uma vez e beber rápido pode causar novo mal-estar. Levante aos poucos.",story:"Thiago bebe, fica tonto e deita de novo. Você aprende que a pressa não ajuda."}
  ]},
  endGood:{end:true,tone:"good",title:"Recuperação tranquila",text:"Você deitou, elevou as pernas, ventilou e deu água só quando estava acordado. Thiago foi avaliado e teve alta. Lembre-se: se não acordar em cerca de 1 minuto, chame o 192."},
  endOk:{end:true,tone:"ok",title:"Resolveu, mas com atraso",text:"Thiago acabou recebendo atendimento, mas pequenas falhas atrasaram a recuperação. Revise: checar respiração, deitar e elevar pernas, 192 se não acordar em cerca de 1 minuto."},
  endBad:{end:true,tone:"bad",title:"Pressa perigosa",text:"Sacudir, sentar ou liberar cedo demais coloca o desmaiado em risco. Deite, eleve as pernas, observe e chame ajuda quando preciso."}
 },
 safety:"Nunca simule desmaio em pessoas reais sem supervisão. Na vida real, se a pessoa não acordar em cerca de 1 minuto ou não respirar normalmente, ligue 192 e inicie RCP."
},
{
 id:"s05", title:"Engasgo no jantar", env:"home", module:"m4", theme:"Engasgo grave em criança", variation:1, diff:3,
 intro:"Jantar em família. Seu irmão Davi, de 6 anos, estava comendo carne e feijão quando, de repente, leva as mãos ao pescoço. Ele abre a boca, mas não consegue tossir, falar nem chorar. Os lábios começam a ficar arroxeados. Sua mãe está na cozinha e a vovó, ao lado da mesa, está em pânico.",
 characters:[{name:"Davi",role:"seu irmão, 6 anos"},{name:"Rosana",role:"sua mãe"},{name:"Vovó Lúcia",role:"sua avó"}],
 problem:"Criança com obstrução grave das vias aéreas: não tosse, não fala, não respira.",
 items:[
  {id:"a",kind:"child_stand",x:44,y:72,label:"Davi",note:"Está com as mãos no pescoço, boca aberta, sem emitir som. Os lábios estão arroxeados.",key:true},
  {id:"b",kind:"table",x:68,y:68,label:"Mesa de jantar",note:"Há pratos com carne e feijão. Era a comida que ele estava mastigando.",key:false},
  {id:"c",kind:"person_stand",x:12,y:68,label:"Mãe Rosana",note:"Está na cozinha, com o celular na mão. Ela pode ligar para o 192.",key:true},
  {id:"d",kind:"person_sit",x:90,y:70,label:"Vovó Lúcia",note:"Está sentada, assustada. Não é a melhor para a manobra, mas pode ajudar ligando.",key:false},
  {id:"e",kind:"bottle",x:28,y:82,label:"Copo de suco",note:"Um copo de suco. Dar líquido a quem engasgou piora a situação.",key:true},
  {id:"f",kind:"chair",x:78,y:82,label:"Cadeira",note:"A cadeira dele ficou para trás. Há espaço para ficar atrás dele.",key:false}
 ],
 nodes:{
  start:{text:"Davi não tosse nem fala e está ficando arroxeado. O que você faz agora?",choices:[
   {t:"Dar um copo de suco para ele engolir o que está preso.",next:"nR",q:"bad",fb:"Líquido não desobstrui e piora o risco. Em obstrução grave a criança não consegue nem respirar.",story:"Davi não consegue engolir o suco, que escorre. A cor dos lábios fica mais escura e você percebe o erro."},
   {t:"Gritar para a mãe ligar para o 192 e, inclinando Davi para a frente, dar 5 tapas firmes entre as omoplatas.",next:"n2",q:"best",fb:"Obstrução grave: peça ajuda e inicie já as manobras. Cinco tapas nas costas com a criança inclinada para frente são o primeiro passo.",story:"Sua mãe liga para o 192. Seus cinco tapas não soltam o alimento, mas você já tem a sequência."},
   {t:"Correr até a cozinha para chamar a mãe e deixar Davi sozinho.",next:"nR",q:"ok",fb:"Chamar ajuda é essencial, mas gritar a poucos metros e agir ao mesmo tempo é mais rápido. Deixar a criança sem ajuda perde segundos preciosos.",story:"Você volta com a mãe, mas Davi já está mais fraco e os lábios estão azulados."}
  ]},
  nR:{text:"Davi está mais mole e com os lábios mais azulados. Sua mãe liga para o 192. Você precisa agir já. O que faz?",choices:[
   {t:"Colocar o dedo na garganta dele para tentar tirar o alimento.",next:"endBad",q:"bad",fb:"Dedo às cegas empurra o alimento mais para dentro. Só se retira objeto visível, o que aqui não é o caso.",story:"Davi vomita parte da comida, mas o alimento sobe e desce. A situação segue crítica."},
   {t:"Dar 5 tapas nas costas, alternar com 5 compressões abdominais e manter o 192 na linha.",next:"n2",q:"best",fb:"A sequência de 5 tapas e 5 compressões abdominais é a conduta para engasgo grave em criança. Siga o protocolo ensinado pelo instrutor presencial.",story:"Você posiciona Davi e a mãe cuida da ligação. O alimento ainda não sai, mas Davi segue respondendo."},
   {t:"Balançar Davi pelos braços e esperar o alimento sair.",next:"endBad",q:"ok",fb:"Balançar não é conduta de desobstrução e perde tempo. O correto é aplicar tapas e compressões.",story:"Nada muda e Davi fica ainda mais fraco. O tempo está acabando."}
  ]},
  n2:{text:"Cinco tapas nas costas não resolveram. Davi ainda não tosse nem fala. Qual é o próximo passo?",choices:[
   {t:"Repetir só os tapas, cada vez mais fortes.",next:"n3",q:"ok",fb:"Tapas ajudam, mas a sequência recomendada alterna com compressões abdominais. Só tapas pode não bastar.",story:"O alimento não se move e Davi parece cada vez mais cansado."},
   {t:"Ficar atrás dele, punho acima do umbigo e abaixo do osso do peito, e fazer 5 compressões para dentro e para cima.",next:"n3",q:"best",fb:"Compressões abdominais (Heimlich) aumentam a pressão no tórax e empurram o objeto para fora. Em criança, adapte a força ao tamanho dele.",story:"Na terceira compressão, você sente que algo se solta. Davi dá um grande suspiro."},
   {t:"Pedir para ele pular para ver se solta o alimento.",next:"n3",q:"bad",fb:"Pular não resolve e perde tempo. Mantenha tapas e compressões em sequência.",story:"Nada mudou e Davi fica mais pálido. Você volta às manobras certas."}
  ]},
  n3:{text:"O alimento sai. Davi chora e respira, com o rosto vermelho. Sua mãe está em lágrimas. O que fazer agora?",choices:[
   {t:"Acalmar Davi, mantê-lo sentado e manter o 192 a caminho para a avaliação, mesmo que ele esteja bem.",next:"endGood",q:"best",fb:"Após manobra abdominal em criança, a avaliação médica é recomendada, pois podem ocorrer lesões. Mantenha o 192 e observe a respiração.",story:"Os socorristas examinam Davi, confirmam que está estável e o levam para avaliação por segurança."},
   {t:"Dar água para ele e liberar para terminar o jantar.",next:"endBad",q:"bad",fb:"Beber e comer logo depois pode provocar novo engasgo, e a avaliação médica é importante após a manobra.",story:"Davi tosse de novo ao beber e a família decide chamar o SAMU de novo."},
   {t:"Cancelar o 192 porque ele está bem e observar em casa.",next:"endOk",q:"ok",fb:"Estar bem logo após não exclui lesões. Após manobras abdominais, procure avaliação médica.",story:"A família leva Davi ao pronto-socorro mais tarde. Tudo bem, mas poderia ter sido mais seguro com o SAMU."}
  ]},
  endGood:{end:true,tone:"good",title:"Davi respira de novo",text:"Você reconheceu o engasgo grave, pediu ajuda e usou tapas e compressões. Davi foi avaliado e está bem. Lembre: engasgo grave exige ação imediata e o 192."},
  endOk:{end:true,tone:"ok",title:"Salvou, mas com falhas",text:"O alimento saiu, mas faltaram passos de segurança. Após uma obstrução grave, a avaliação médica é importante. Revise a sequência."},
  endBad:{end:true,tone:"bad",title:"Perdeu tempo precioso",text:"Líquidos, dedo às cegas ou esperar sem agir não resolvem. Em engasgo grave, aja já: 192, 5 tapas e 5 compressões, e RCP se ele desmaiar."}
 },
 safety:"Nunca pratique manobras de engasgo em pessoas reais. Aprenda com instrutor presencial, em bonecos. Em engasgo grave, ligue 192 e inicie a sequência."
},
{
 id:"s06", title:"A bala no parque", env:"park", module:"m4", theme:"Engasgo leve que pode piorar", variation:2, diff:3,
 intro:"Tarde de domingo no parque. Você cuida da sua prima Helena, de 5 anos, enquanto sua tia conversa com uma amiga no banco. Helena corre com uma bala na boca, tropeça e, de repente, começa a tossir muito forte. Seu amigo Vini está por perto, brincando na gangorra.",
 characters:[{name:"Helena",role:"sua prima, 5 anos"},{name:"Vini",role:"amigo, 14 anos"},{name:"Tia Paula",role:"mãe da Helena, a alguns metros"}],
 problem:"Criança engasga com bala, começando com tosse forte que pode evoluir para obstrução grave.",
 items:[
  {id:"a",kind:"child_stand",x:42,y:72,label:"Helena",note:"Está com a mão na garganta, tossindo forte e com os olhos cheios de lágrimas. Ainda consegue falar um pouco.",key:true},
  {id:"b",kind:"person_stand",x:20,y:70,label:"Vini",note:"Seu amigo está perto, pronto para ajudar. Ele pode ligar para o 192.",key:false},
  {id:"c",kind:"bench",x:68,y:66,label:"Tia Paula",note:"Sua tia está no banco, um pouco distante. Ela precisa ser avisada.",key:true},
  {id:"d",kind:"swing",x:88,y:68,label:"Balanço",note:"O balanço ainda se mexe. Não é prioridade.",key:false},
  {id:"e",kind:"bottle",x:56,y:82,label:"Garrafa de água",note:"Uma garrafa de água. Água não ajuda no engasgo e pode piorar.",key:true},
  {id:"f",kind:"backpack",x:12,y:82,label:"Mochila",note:"Sua mochila com as coisas da Helena. Nada útil agora.",key:false}
 ],
 nodes:{
  start:{text:"Helena tosse forte e consegue falar, mas está assustada. O que fazer?",choices:[
   {t:"Dar tapas fortes nas costas e oferecer água.",next:"nR",q:"bad",fb:"Em engasgo leve, não bata nas costas (pode deslocar o objeto e piorar) e não dê água. Estimule a tosse.",story:"Helena para de tossir de repente e coloca as mãos no pescoço. Você percebe que algo piorou."},
   {t:"Ficar ao lado, calado, só observando.",next:"n2",q:"ok",fb:"Observar é certo, mas incentivar a tosse forte ajuda a expulsar o objeto. Fale com ela e a encoraje a tossir.",story:"Helena continua tossindo, mas parece mais assustada, sem apoio."},
   {t:"Incentivar a tosse forte, ficar ao lado, pedir ao Vini que chame a tia e observar atentamente.",next:"n2",q:"best",fb:"Se a criança tosse e respira, a tosse é o melhor mecanismo para expelir o objeto. Observe: se enfraquecer ou ela não conseguir falar, é grave.",story:"Vini vai chamar a tia. Helena continua tossindo, mas a tosse começa a perder força."}
  ]},
  nR:{text:"Helena não tosse mais e não fala. Seus lábios estão ficando arroxeados. O que fazer?",choices:[
   {t:"Dar mais um pouco de água para ela engolir.",next:"endBad",q:"bad",fb:"Líquido não desobstrui e pode agravar o engasgo. Em obstrução grave, aja com tapas e compressões.",story:"A água escorre pela boca de Helena e ela fica mais pálida."},
   {t:"Pedir ao Vini que ligue para o 192 e começar 5 tapas nas costas e 5 compressões abdominais.",next:"n3",q:"best",fb:"Ao perceber que a tosse parou e a criança não fala, trate como engasgo grave: ajuda + manobras alternadas.",story:"Vini liga para o 192. Você posiciona Helena e começa as manobras."},
   {t:"Ligar para o 192 e esperar a orientação sem fazer nada.",next:"endOk",q:"ok",fb:"Ligar é ótimo, mas em obstrução grave você deve agir imediatamente enquanto aguarda orientação.",story:"A atendente orienta as manobras. Você as inicia, mas perdeu alguns segundos."}
  ]},
  n2:{text:"A tosse de Helena enfraquece. Ela tenta falar e não consegue. Faz um som agudo e coloca as mãos no pescoço. O que fazer?",choices:[
   {t:"Continuar mandando ela tossir mais forte.",next:"nR",q:"bad",fb:"Quando a tosse perde força e a criança não fala nem respira bem, é obstrução grave. Pedir para tossir não resolve mais.",story:"Helena não consegue mais tossir e fica azulada. Você muda a conduta."},
   {t:"Ligar para o 192 e aguardar a ambulância sem tocá-la.",next:"n3",q:"ok",fb:"Ligar é essencial, mas é necessário agir já com tapas e compressões, não apenas aguardar.",story:"A atendente pede que você inicie as manobras. Você obedece e age."},
   {t:"Pedir ao Vini para ligar para o 192 e iniciar 5 tapas nas costas e 5 compressões abdominais.",next:"n3",q:"best",fb:"Tosse fraca, ausência de voz e sinais de sufocação indicam obstrução grave: ação imediata e 192.",story:"Vini liga. Você inclina Helena para frente e aplica a sequência de tapas e compressões."}
  ]},
  n3:{text:"Depois de alguns ciclos, Helena fica mole nos seus braços e não reage mais. O que você faz?",choices:[
   {t:"Continuar as compressões abdominais com ela no colo.",next:"endBad",q:"bad",fb:"Inconsciente, a criança deve ser colocada no chão e receber RCP. Insistir na manobra abdominal em pé perde tempo.",story:"Helena escorrega dos seus braços. Sua tia chega e vocês a deitam no chão."},
   {t:"Deitá-la no chão, confirmar o 192 e começar RCP (30 compressões:2 ventilações se treinado), olhando a boca antes de cada ventilação.",next:"endGood",q:"best",fb:"Obstrução com inconsciência é tratada como parada: 192 e RCP. Se treinado, 30:2; se não, só compressões. Siga o protocolo do instrutor presencial.",story:"Você comprime o tórax de Helena, sem parar, até a equipe do SAMU chegar. Eles assumem a RCP e a levam ao hospital."},
   {t:"Deitá-la no chão e esperar o SAMU sem fazer RCP.",next:"endOk",q:"ok",fb:"Aguardar sem RCP desperdiça o tempo mais importante. Comece compressões já.",story:"O SAMU chega e inicia a RCP. O atendimento começou depois do que podia."}
  ]},
  endGood:{end:true,tone:"good",title:"Você agiu em cada fase",text:"Você reconheceu o engasgo leve, percebeu a piora para o grave e agiu com 192, manobras e RCP. Lembre: leve = estimular a tosse; grave = ação imediata."},
  endOk:{end:true,tone:"ok",title:"Faltou rapidez",text:"A ajuda chegou e o atendimento foi feito, mas atrasos custam caro. Reconhecer a piora e agir logo faz toda a diferença."},
  endBad:{end:true,tone:"bad",title:"Conduta inadequada",text:"Água, tapas no engasgo leve ou insistir na manobra errada pioram a situação. Leve: estimule a tosse. Grave: 192, tapas e compressões. Inconsciente: RCP."}
 },
 safety:"Nunca pratique manobras de engasgo em pessoas reais; aprenda com instrutor presencial. Não dê balas a crianças pequenas correndo. Em dúvida, ligue 192."
},
{
 id:"s07", title:"Queda na trilha", env:"outdoor", module:"m5", theme:"Suspeita de trauma de coluna e cabeça", variation:1, diff:3,
 intro:"Acampamento da igreja na serra. Durante a trilha, o Pedro, de 15 anos, escorrega de uma pedra de uns dois metros e cai de costas no chão. Ele está consciente, mas reclama de dor no pescoço e formigamento nas mãos. Há um corte pequeno na cabeça. Seu celular está sem sinal.",
 characters:[{name:"Pedro",role:"colega, 15 anos"},{name:"Rodrigo",role:"líder do acampamento"},{name:"Ana",role:"amiga, 15 anos"}],
 problem:"Queda de altura com suspeita de lesão na coluna e traumatismo na cabeça, sem sinal de celular.",
 items:[
  {id:"a",kind:"person_down",x:42,y:72,label:"Pedro",note:"Está deitado de costas, consciente, com dor no pescoço e formigamento nas mãos. Há um pequeno corte na cabeça.",key:true},
  {id:"b",kind:"rock",x:22,y:66,label:"Pedra da queda",note:"A pedra de onde ele caiu. Ela parece firme, mas há pedras soltas ao redor.",key:true},
  {id:"c",kind:"phone",x:62,y:82,label:"Celular sem sinal",note:"O celular mostra \"sem serviço\". Será preciso ir a um ponto alto ou mais próximo da estrada para ligar.",key:true},
  {id:"d",kind:"backpack",x:78,y:78,label:"Mochilas",note:"Há casacos e cobertores nas mochilas, que servem para manter Pedro aquecido.",key:false},
  {id:"e",kind:"person_stand",x:90,y:68,label:"Rodrigo",note:"O líder do acampamento está chegando, com o mapa e um apito.",key:false},
  {id:"f",kind:"tree",x:10,y:78,label:"Árvore",note:"Uma árvore ao lado da trilha. Ela dá sombra, mas não é relevante.",key:false}
 ],
 nodes:{
  start:{text:"Pedro está caído, com dor no pescoço e formigamento nas mãos. O que você faz primeiro?",choices:[
   {t:"Ajudá-lo a se sentar e a levantar para voltar ao acampamento.",next:"nR",q:"bad",fb:"Com dor no pescoço e formigamento após queda, mover pode agravar uma lesão da coluna. Não mova sem necessidade.",story:"Ao tentar levantar, Pedro grita de dor. Você para e se arrepende."},
   {t:"Pedir que ele fique imóvel, manter a cabeça alinhada com as mãos, conversar com calma e chamar o líder.",next:"n2",q:"best",fb:"Suspeita de trauma de coluna: não mover, manter cabeça alinhada e acalmar. Chamar o líder e dividir tarefas é essencial.",story:"Pedro se acalma. Rodrigo se aproxima e avalia a cena com você."},
   {t:"Correr para chamar o líder, deixando Pedro sozinho e sem instruções.",next:"n2",q:"ok",fb:"Chamar o líder é importante, mas deixar o Pedro sem instruções pode levar a ele a tentar se mexer. Peça que fique imóvel.",story:"Quando você volta, Pedro está tentando se apoiar nos cotovelos. Você pede que ele pare."}
  ]},
  nR:{text:"Pedro está deitado de novo, assustado, com mais dor. O que faz agora?",choices:[
   {t:"Pedir que fique imóvel, manter a cabeça alinhada e chamar o líder.",next:"n2",q:"best",fb:"Corrigir o rumo ainda é possível: imobilizar, alinhar e chamar ajuda.",story:"Você segura a cabeça de Pedro com as mãos, e Rodrigo chega para ajudar."},
   {t:"Tentar carregá-lo nas costas até o acampamento.",next:"endBad",q:"bad",fb:"Transportar nessas condições pode causar lesão grave de medula. Só mova se houver perigo iminente.",story:"Pedro grita e fica pálido. O grupo precisa parar e deitá-lo de novo, mas o dano pode já ter sido feito."},
   {t:"Pedir que ele mexa o pescoço devagar para ver se melhora.",next:"endOk",q:"ok",fb:"Testar movimentos pode agravar lesões. Mantenha o pescoço parado.",story:"Pedro faz uma careta e você corrige na hora. Por sorte, não houve piora."}
  ]},
  n2:{text:"O celular está sem sinal. O grupo precisa decidir como pedir ajuda. O que fazer?",choices:[
   {t:"Montar uma maca improvisada e carregar Pedro até a estrada.",next:"n3",q:"bad",fb:"Sem treino, carregar alguém com suspeita de coluna pode piorar. Só mova se houver perigo imediato.",story:"O grupo começa a se desorganizar e Pedro geme de dor. Rodrigo decide parar e rever o plano."},
   {t:"Enviar duas pessoas juntas até um ponto alto ou estrada com sinal, levando localização, nome e situação para ligar para o 192 e 193.",next:"n3",q:"best",fb:"Em áreas sem sinal, mande dupla (nunca sozinho) com a localização exata. Ligue para 192 e, em área de mata ou serra, 193 (Bombeiros).",story:"Ana e Rodrigo partem juntos, com o mapa. Algum tempo depois, conseguem sinal e ligam. A resposta é rápida: a equipe está a caminho."},
   {t:"Mandar uma só pessoa correr sozinha até a estrada.",next:"n3",q:"ok",fb:"Pedir ajuda é certo, mas ir sozinho aumenta o risco de se perder ou se machucar. Prefira dupla e com mapa.",story:"Ana vai sozinha e se atrapalha na trilha. Demora mais, mas finalmente consegue sinal."}
  ]},
  n3:{text:"Enquanto esperam, Pedro fica sonolento e vomita. O que você faz?",choices:[
   {t:"Virar Pedro de lado, em bloco, com ajuda de outras pessoas, mantendo cabeça, pescoço e tronco alinhados.",next:"endGood",q:"best",fb:"Se ele vomitar, é preciso proteger as vias aéreas: virar em bloco, com ajuda, mantendo o alinhamento. Sonolência e vômito também são sinais de gravidade.",story:"Vocês viram Pedro com cuidado, sem torcer o pescoço. Ele vomita sem engasgar e vocês o cobrem com casacos. A equipe de resgate chega e assume."},
   {t:"Sentá-lo rapidamente para vomitar melhor e dar água.",next:"endBad",q:"bad",fb:"Sentar quem tem suspeita de coluna e dar água é perigoso: pode agravar a lesão e causar aspiração.",story:"Pedro grita e engasga ao tentar beber. Rodrigo interrompe e vocês o deitam de novo."},
   {t:"Segurar a cabeça dele e deixá-lo de costas, apenas cobrindo com um casaco.",next:"endOk",q:"ok",fb:"Manter a cabeça segura é bom, mas de costas ele pode aspirar vômito. Vire em bloco com ajuda.",story:"Pedro tosse e você percebe o risco. Vocês o viram juntos e tudo termina bem."}
  ]},
  endGood:{end:true,tone:"good",title:"Resgate no tempo certo",text:"Você manteve Pedro imóvel, organizou o pedido de ajuda em dupla e protegeu as vias aéreas. A equipe de resgate o imobilizou e o levou. Lembre: não mova, alinhe e acione ajuda."},
  endOk:{end:true,tone:"ok",title:"Deu certo, com sorte",text:"Pedro foi resgatado, mas algumas ações arriscadas podiam ter agravado a situação. Revise: sem mover, dupla para pedir ajuda, virar em bloco."},
  endBad:{end:true,tone:"bad",title:"Mover foi um erro grave",text:"Mover alguém com suspeita de coluna sem necessidade pode causar lesões graves e permanentes. Quando em dúvida, mantenha imóvel e peça ajuda especializada."}
 },
 safety:"Nunca simule lesão de coluna em pessoas reais. Na vida real, não mova a vítima sem perigo iminente; em trilhas, avise sempre a localização ao 192 ou 193."
}
);
