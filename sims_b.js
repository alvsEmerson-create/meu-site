(window.__SIMS=window.__SIMS||[]).push(
{
 id:"s08", title:"Vidro na calçada", env:"street", module:"m6", theme:"Hemorragia externa no antebraço", variation:1, diff:2,
 intro:"Você volta da escola com dois colegas, pela rua da padaria. Rafael tropeça perto de uma garrafa quebrada e apoia o braço nos cacos. Quando ele levanta, o sangue escorre rápido pelo antebraço e pinga na calçada. Todo mundo ao redor para e olha. Você decide o que fazer nos próximos minutos.",
 characters:[ {name:"Rafael", role:"colega, 15 anos, ferido"}, {name:"Bianca", role:"colega, 14 anos"}, {name:"Dona Neusa", role:"dona da padaria"} ],
 problem:"Rafael tem um corte profundo no antebraço, com sangramento forte, e um caco pequeno parece estar preso na pele.",
 items:[
  {id:"a", kind:"person_sit", x:40, y:72, label:"Rafael", note:"Está sentado no meio-fio, pálido, segurando o braço. O sangue escorre sem parar e ele está assustado.", key:true},
  {id:"b", kind:"glass", x:24, y:80, label:"Cacos de vidro", note:"Há cacos espalhados na calçada. Você pode se cortar também se pisar ou apoiar a mão ali.", key:true},
  {id:"c", kind:"backpack", x:56, y:78, label:"Mochila de Bianca", note:"Tem uma camiseta limpa de educação física e um saco plástico. Servem como pano e como proteção para as suas mãos.", key:true},
  {id:"d", kind:"phone", x:72, y:66, label:"Celular de Bianca", note:"Dá para ligar para o 192 (SAMU) agora mesmo.", key:false},
  {id:"e", kind:"bench", x:8, y:60, label:"Banco da praça", note:"Um lugar para sentar, mas fica longe dos cacos. Não é o mais importante agora.", key:false},
  {id:"f", kind:"door", x:88, y:56, label:"Padaria", note:"Dona Neusa está na porta. Ela pode ajudar, mas ninguém ainda está cuidando do corte.", key:false}
 ],
 nodes:{
  start:{ text:"O sangue não para. Bianca está paralisada, Dona Neusa olha da porta. Qual é a sua primeira atitude?", choices:[
   {t:"Correr até a padaria buscar um adulto e deixar Rafael sozinho", next:"r1", q:"bad", fb:"Deixar a vítima sozinha com hemorragia faz perder tempo precioso. O sangramento precisa ser controlado já, e outra pessoa pode buscar ajuda.", story:"Você volta em um minuto, mas o pano de Rafael é só a mão dele e o sangue já formou uma poça."},
   {t:"Apertar o corte com a mão nua o mais rápido possível", next:"n2", q:"ok", fb:"Apertar logo é o certo, mas sem proteção você se expõe ao sangue dele. Use luvas ou, se não tiver, um saco plástico nas mãos, e peça para alguém ligar para o 192.", story:"O sangramento diminui um pouco, mas suas mãos ficam cobertas de sangue e ninguém ligou para o SAMU ainda."},
   {t:"Pegar o saco plástico e a camiseta limpa da mochila, calçar o saco nas mãos, pedir que Bianca ligue 192 e comprimir o corte", next:"n2", q:"best", fb:"Proteja-se primeiro (luvas ou saco plástico), peça o 192 e faça pressão direta com pano limpo. É a base do controle de hemorragia.", story:"Bianca liga para o 192 e a atendente pede o endereço. Você aperta firme a camiseta sobre o corte."}
  ]},
  r1:{ text:"Você voltou. Rafael está tonto e o sangue continua. Dona Neusa chegou com você. O que faz agora?", choices:[
   {t:"Colocar um pano limpo sobre o corte e apertar firme, com o saco plástico nas mãos, enquanto Dona Neusa liga para o 192", next:"n2", q:"best", fb:"Corrigir o rumo é possível: pressão direta e 192 já. Cada minuto sem controlar o sangramento piora o quadro.", story:"A pressão firme finalmente freia o sangue. Dona Neusa chama o SAMU."},
   {t:"Lavar o corte com água da padaria antes de qualquer coisa", next:"endOk", q:"ok", fb:"Lavar não é prioridade em hemorragia forte. O principal é controlar o sangramento com pressão.", story:"Rafael perde ainda mais sangue enquanto você procura a água. O SAMU é acionado depois."},
   {t:"Pedir que Rafael levante o braço e esperar para ver se para sozinho", next:"endBad", q:"bad", fb:"Sangramento forte raramente para sozinho. Esperar sem pressionar põe a vida em risco.", story:"Rafael desmaia pálido na calçada antes de alguém reagir."}
  ]},
  n2:{ text:"A camiseta já está encharcada de sangue. Rafael diz que está tonto. O que faz?", choices:[
   {t:"Tirar a camiseta encharcada e colocar outra limpa", next:"n3", q:"bad", fb:"Retirar o curativo encharcado desfaz o coágulo que começou a se formar e o sangue volta a jorrar. Coloque mais pano por cima.", story:"Ao soltar o pano, o sangue volta a escorrer forte. Você aperta de novo, mas perdeu um tempo importante."},
   {t:"Manter a camiseta e colocar outro pano por cima, apertando mais forte, com o braço no nível do coração", next:"n3", q:"best", fb:"Não retire o curativo encharcado: acrescente mais camadas e mantenha a pressão contínua. Isso protege o coágulo.", story:"O sangue para de atravessar o tecido. Rafael respira um pouco mais calmo."},
   {t:"Manter a camiseta, mas afrouxar a pressão para ele sentir menos dor", next:"n3", q:"ok", fb:"Manter o pano é certo, mas afrouxar deixa o sangue voltar a sair. A pressão deve ser firme e contínua até a chegada do SAMU.", story:"O pano volta a ficar molhado e você precisa apertar de novo."}
  ]},
  n3:{ text:"Ao olhar de perto, você vê um caco de vidro pequeno cravado na borda do corte. O que faz?", choices:[
   {t:"Puxar o caco com cuidado para apertar melhor", next:"n4", q:"bad", fb:"Nunca remova objeto cravado: ele pode estar fazendo pressão sobre um vaso e a retirada piora o sangramento e o dano.", story:"Rafael grita de dor e o sangue jorra mais forte. Você precisa apertar com mais pano."},
   {t:"Deixar o caco no lugar e fazer pressão ao redor dele, com almofada de pano para não empurrá-lo, informando o 192", next:"n4", q:"best", fb:"Pressione ao redor sem mexer no objeto, estabilize com pano volumoso e avise a central sobre o caco.", story:"A atendente confirma que a equipe já foi enviada e orienta você a continuar assim."},
   {t:"Apertar com força em cima do caco para o sangue parar logo", next:"n4", q:"bad", fb:"Apertar sobre o objeto pode enterrá-lo mais e machucar mais. A pressão deve ser ao redor, sem empurrar o caco.", story:"Rafael geme de dor. Você percebe que está piorando e muda a posição das mãos."}
  ]},
  n4:{ text:"Rafael está pálido, suado e com a pele fria. Ele pede água. O SAMU ainda não chegou.", choices:[
   {t:"Deitar Rafael longe dos cacos, manter a pressão, cobri-lo com um casaco e não dar nada para beber", next:"endGood", q:"best", fb:"Sinais de choque: deite, aqueça, mantenha a pressão e nada por via oral (ele pode precisar de cirurgia). Fique ao lado até o SAMU chegar.", story:"Rafael relaxa deitado e agasalhado. Em poucos minutos a ambulância chega."},
   {t:"Dar água a ele e sentá-lo no banco da praça", next:"endOk", q:"ok", fb:"Ele pode vomitar e precisar de procedimento, então nada por boca. Sentado, a tontura piora; o ideal é deitar.", story:"Rafael melhora um pouco, mas fica tonto no banco. A ambulância chega e a equipe orienta você."},
   {t:"Soltar o curativo para ver se parou de sangrar", next:"endBad", q:"bad", fb:"Olhar o corte soltando o pano reabre o sangramento e remove o coágulo. Mantenha a pressão até a equipe assumir.", story:"O sangue volta a jorrar e Rafael desmaia antes de a ambulância chegar."}
  ]},
  endGood:{ end:true, tone:"good", title:"Controle total", text:"Rafael chegou ao hospital estável e levou pontos. Você usou proteção, pressão direta, não removeu o caco e acionou o 192 cedo. Lição: pressão contínua, curativo por cima do encharcado e proteção pessoal." },
  endOk:{ end:true, tone:"ok", title:"Foi, mas por pouco", text:"Rafael foi socorrido e está bem, mas perdeu mais sangue do que o necessário por atrasos e escolhas incompletas. Lição: proteja-se, acione o 192 cedo e mantenha a pressão sem soltar." },
  endBad:{ end:true, tone:"bad", title:"Hemorragia sem controle", text:"A perda de sangue deixou Rafael em estado grave até a equipe do SAMU chegar. Sangramento forte precisa de pressão direta imediata e ligação ao 192. Em dúvida, aperte e peça ajuda." }
 },
 safety:"Nunca pratique pressão em ferimento real de colegas na brincadeira. Em simulação, use apenas panos e bonecos. Siga o protocolo ensinado pelo instrutor presencial."
},
{
 id:"s09", title:"Silêncio no salão", env:"community", module:"m7", theme:"Parada cardiorrespiratória em adulto", variation:1, diff:3,
 intro:"É sábado à noite e o salão da igreja está cheio para um evento. Durante a pregação, o Sr. Antônio, de uns 60 anos, que estava na fileira da frente, escorrega da cadeira e cai no chão. As pessoas ficam em pé, algumas gritam. Você está a três metros dele.",
 characters:[ {name:"Sr. Antônio", role:"adulto, cerca de 60 anos"}, {name:"Tia Marlene", role:"voluntária da recepção"}, {name:"Pastor Josué", role:"dirigente do evento"}, {name:"Davi", role:"colega, 14 anos"} ],
 problem:"Um adulto caiu, não responde e não respira normalmente: provável parada cardiorrespiratória.",
 items:[
  {id:"a", kind:"person_down", x:40, y:76, label:"Sr. Antônio", note:"Deitado de barriga para cima, imóvel, com os lábios arroxeados. Não responde quando você chama.", key:true},
  {id:"b", kind:"crowd", x:72, y:62, label:"Plateia", note:"Muita gente em pé e assustada. Falta alguém que dê ordens claras. Vão atrapalhar se não forem orientados.", key:true},
  {id:"c", kind:"aed", x:88, y:56, label:"Caixa do DEA", note:"Há um aparelho DEA numa caixa na parede perto da recepção, a uns 20 passos.", key:true},
  {id:"d", kind:"phone", x:56, y:70, label:"Celular de Davi", note:"O celular de Davi tem sinal. Dá para ligar para o 192 agora.", key:false},
  {id:"e", kind:"chair", x:24, y:66, label:"Cadeira caída", note:"A cadeira em que ele estava sentado caiu para trás. Não é essencial agora.", key:false},
  {id:"f", kind:"table", x:8, y:58, label:"Mesa da bíblia", note:"A mesa com folhetos fica ao lado. Não ajuda na emergência.", key:false}
 ],
 nodes:{
  start:{ text:"O Sr. Antônio está no chão. O que você faz primeiro?", choices:[
   {t:"Abanar o rosto dele com um folheto e pedir para ele beber água", next:"r1", q:"bad", fb:"Se ele não responde, água é perigosa e abanar não resolve. Cheque primeiro a resposta e a respiração.", story:"O Sr. Antônio continua parado e o tempo passa."},
   {t:"Gritar por ajuda, sem checar nada, e esperar alguém assumir", next:"n2", q:"ok", fb:"Pedir ajuda é bom, mas você precisa confirmar a falta de resposta e respiração antes de pedir 192 e DEA.", story:"Ninguém assume. Você precisa voltar ao paciente."},
   {t:"Garantir que o local está seguro, chamar alto o nome dele, tocar os ombros e olhar o peito por até 10 segundos", next:"n2", q:"best", fb:"Confirmar rapidamente: sem resposta e sem respiração normal (ou só gemidos) é sinal de PCR. Não perca mais de 10 segundos.", story:"Ele não responde e o peito não sobe. Há só um ofego raro, que não é respiração normal."}
  ]},
  r1:{ text:"Passam alguns segundos e ele continua sem reação. Tia Marlene chega ao seu lado. O que faz?", choices:[
   {t:"Chamar o nome dele, tocar os ombros e conferir a respiração por até 10 segundos", next:"n2", q:"best", fb:"Verificar resposta e respiração é o primeiro passo certo. Corrija e siga.", story:"Sem resposta e sem respiração normal. Você entende que é grave."},
   {t:"Levantar o Sr. Antônio e levá-lo para o corredor", next:"endBad", q:"bad", fb:"Mover sem necessidade atrasa o socorro e pode machucar. A prioridade é checar e iniciar compressões.", story:"Ele escorrega dos braços de vocês. O tempo se perde."},
   {t:"Pedir que alguém ligue para o 192 e depois seguir observando", next:"endOk", q:"ok", fb:"Ligar é certo, mas sem iniciar as compressões o cérebro fica sem oxigênio. Chame e comece a RCP.", story:"A ambulância é chamada, mas ninguém inicia a RCP até a chegada."}
  ]},
  n2:{ text:"Ele não responde e não respira normalmente. Todos olham para você. Como organiza a ajuda?", choices:[
   {t:"Gritar 'Alguém liga para o 192!' para o salão inteiro", next:"n3", q:"ok", fb:"Pedir para 'alguém' pode fazer cada um achar que outro ligou. Aponte pessoas específicas e dê tarefas claras.", story:"Várias pessoas olham para você, mas ninguém liga. Você perde alguns segundos."},
   {t:"Sair correndo até a recepção para ligar você mesmo", next:"n3", q:"bad", fb:"Sair deixa a vítima sem compressões. O socorrista deve ficar com ela e delegar o telefone.", story:"Ele fica sem massagem por quase um minuto."},
   {t:"Apontar Davi: 'Ligue 192 e diga o endereço!'; apontar Tia Marlene: 'Traga o DEA!'. Ficar com o Sr. Antônio", next:"n3", q:"best", fb:"Apontar pessoas e dar tarefas específicas organiza o socorro. Quem liga recebe orientações do 192 e informa a parada.", story:"Davi liga e Tia Marlene corre até a caixa do DEA."}
  ]},
  n3:{ text:"É hora de iniciar a RCP. Você nunca fez em alguém real, só treinou. Como começa?", choices:[
   {t:"Bater nas costas dele para ele voltar a respirar", next:"n4", q:"bad", fb:"Tapas nas costas não reiniciam o coração. A manobra certa são compressões no centro do tórax.", story:"Nada acontece e o tempo é perdido."},
   {t:"Ajoelhar ao lado, mãos sobrepostas no centro do peito, comprimir forte e rápido, 100 a 120 por minuto, cerca de 5 cm, deixando o tórax voltar", next:"n4", q:"best", fb:"Compressões fortes e rápidas, sem interrupção, mantêm sangue no cérebro. Leigo sem treino: só compressões. Treinado: 30 compressões para 2 ventilações.", story:"Você sente as costelas cederem. Isso pode acontecer e é aceitável: continue."},
   {t:"Comprimir devagar para não machucar", next:"n4", q:"ok", fb:"Comprimir devagar demais ou raso não bombeia sangue. Fortes e rápidas, ~5 cm e 100 a 120 por minuto.", story:"Pouca coisa muda. Você percebe que precisa de mais força."}
  ]},
  n4:{ text:"Tia Marlene chega com o DEA. Você está cansado de comprimir.", choices:[
   {t:"Parar tudo e esperar o SAMU, pois o DEA parece complicado", next:"endBad", q:"bad", fb:"O DEA é simples e fala o que fazer. Esperar pode ser fatal. Cada minuto sem choque reduz as chances.", story:"A ambulância demora e o Sr. Antônio piora."},
   {t:"Ligar o DEA, colar as pás no peito nu, seguir a voz, afastar todos para a análise, apertar o botão se indicado e retomar as compressões logo", next:"endGood", q:"best", fb:"Ligar, colar pás, afastar, dar choque se indicado e retomar a RCP imediatamente. Troque quem comprime a cada 2 minutos.", story:"O aparelho recomenda o choque. Você retoma as compressões e a equipe chega."},
   {t:"Usar o DEA, mas continuar tocando nele durante a análise", next:"endOk", q:"ok", fb:"Tocar durante a análise atrapalha o aparelho e pode causar choque em quem toca. Afaste todos.", story:"O aparelho pede para não tocar. Você corrige e a equipe chega pouco depois."}
  ]},
  endGood:{ end:true, tone:"good", title:"Cadeia da sobrevivência", text:"Você reconheceu a parada, distribuiu tarefas, comprimiu e usou o DEA. O SAMU assumiu com o coração dele reagindo. Lição: ligar, comprimir e desfibrilar cedo salvam vidas." },
  endOk:{ end:true, tone:"ok", title:"Quase lá", text:"O socorro foi acionado e o Sr. Antônio recebeu algum tratamento, mas com atrasos. Lição: cheque, aponte pessoas, comprima forte e use o DEA sem hesitar." },
  endBad:{ end:true, tone:"bad", title:"Tempo perdido", text:"Sem compressões e sem DEA a tempo, as chances de sobrevivência despencaram. Lição: na PCR cada minuto conta. Ligue 192, comprima e peça o DEA." }
 },
 safety:"Pratique RCP apenas em boneco, com orientação de instrutor presencial. Nunca em pessoas reais. Siga o protocolo ensinado pelo instrutor."
},
{
 id:"s10", title:"Colapso na quadra", env:"court", module:"m7", theme:"RCP e uso do DEA em atleta jovem", variation:2, diff:3,
 intro:"É a final do campeonato escolar no ginásio. No meio do segundo tempo, Larissa, de 16 anos, corre, para de repente e cai de costas na quadra. O juiz apita, todos param. O professor corre até ela e ninguém sabe o que fazer. Você vê um aparelho DEA numa caixa na parede.",
 characters:[ {name:"Larissa", role:"atleta, 16 anos"}, {name:"Prof. Cláudio", role:"professor de educação física"}, {name:"Mateus", role:"colega do time"}, {name:"Sra. Vera", role:"zeladora do ginásio"} ],
 problem:"Uma atleta colapsa em quadra, não responde e não respira normalmente; há um DEA disponível.",
 items:[
  {id:"a", kind:"person_down", x:40, y:74, label:"Larissa", note:"Está caída, imóvel, sem responder. O peito não se mexe como respiração normal.", key:true},
  {id:"b", kind:"aed", x:88, y:58, label:"DEA na parede", note:"Uma caixa com a placa de DEA fica perto da arquibancada, a poucos passos.", key:true},
  {id:"c", kind:"ball", x:24, y:84, label:"Bola de vôlei", note:"A bola rolou até perto de Larissa. Atrapalha o espaço de trabalho.", key:false},
  {id:"d", kind:"crowd", x:70, y:62, label:"Torcida", note:"Muita gente tentando ver. Se ninguém controlar, vão apertar o espaço de quem socorre.", key:true},
  {id:"e", kind:"phone", x:56, y:72, label:"Celular do professor", note:"O professor tem o telefone na mão. Pode ligar para o 192 agora.", key:false},
  {id:"f", kind:"bottle", x:8, y:66, label:"Garrafa de água", note:"Água não ajuda quem não responde. Não use.", key:false}
 ],
 nodes:{
  start:{ text:"Larissa não responde ao ser chamada. O que você faz?", choices:[
   {t:"Gritar o nome dela, tocar os ombros, olhar o peito por até 10 segundos e, ao confirmar, mandar Mateus ligar 192 e Sra. Vera buscar o DEA", next:"n2", q:"best", fb:"Reconhecer rapidamente e distribuir tarefas ganha tempo. Sem resposta e sem respiração normal = PCR.", story:"Larissa continua imóvel. Mateus liga e Sra. Vera corre ao DEA."},
   {t:"Esperar um minuto para ver se ela acorda sozinha", next:"r1", q:"bad", fb:"Em PCR, cada minuto sem compressão diminui muito a chance de sobreviver. Cheque e aja.", story:"Nada muda. Todos esperam com ela imóvel."},
   {t:"Dar água e abanar", next:"n2", q:"ok", fb:"Água é perigosa se a pessoa está inconsciente. Abanar não faz diferença. O correto é checar e chamar socorro.", story:"Ela continua sem resposta. Você percebe que precisa agir diferente."}
  ]},
  r1:{ text:"Passou meio minuto e Larissa segue parada. O professor está ao seu lado, com ar assustado.", choices:[
   {t:"Reconhecer que ela não respira normal, mandar ligar 192 e trazer o DEA", next:"n2", q:"best", fb:"Mudar de ideia a tempo é o que importa. Peça 192 e DEA e comece compressões.", story:"Mateus liga para o 192 e alguém sai correndo atrás do DEA."},
   {t:"Levantar Larissa e levá-la para o banco", next:"endBad", q:"bad", fb:"Mover atrasa o socorro e pode machucar. Ela precisa estar deitada e receber compressões.", story:"O tempo se perde e as chances caem."},
   {t:"Ligar para o pai dela primeiro", next:"endOk", q:"ok", fb:"Avisar a família é importante depois. Primeiro vêm o 192, as compressões e o DEA.", story:"O pai atende e chega, mas o atendimento atrasou."}
  ]},
  n2:{ text:"Você vai começar a RCP enquanto o DEA não chega. Como faz?", choices:[
   {t:"Compressões leves, para não machucar", next:"n3", q:"ok", fb:"Leves não bombeiam o sangue. Devem ser fortes e rápidas, sem medo de quebrar costela: é preferível a morte.", story:"Quase nada muda. Você precisa de mais força."},
   {t:"Ajoelhar, mãos no centro do peito, comprimir 100 a 120 por minuto, cerca de 5 cm, sem parar, deixando o tórax voltar", next:"n3", q:"best", fb:"Compressões de qualidade mantêm o cérebro irrigado até o DEA. Peça a alguém para revezar a cada 2 minutos.", story:"Você mantém o ritmo ouvindo o professor contar. Sra. Vera chega com o DEA."},
   {t:"Parar de comprimir para ir buscar o DEA você mesmo", next:"n3", q:"bad", fb:"Deixar a vítima sem compressões é prejudicial. Delegue a busca do DEA e mantenha as compressões.", story:"Larissa fica sem massagem. Você volta apressado."}
  ]},
  n3:{ text:"O DEA chegou. O peito de Larissa está molhado de suor. O que faz?", choices:[
   {t:"Ligar o DEA, descobrir o peito, secar o suor, colar as pás conforme a figura e seguir a voz", next:"n4", q:"best", fb:"Pele seca ajuda as pás a colarem. Ligue o aparelho primeiro e siga as instruções de voz, sem parar as compressões antes da análise.", story:"As pás colam firmes. O aparelho pede 'não toque no paciente, analisando'."},
   {t:"Colar as pás por cima da roupa para ganhar tempo", next:"n4", q:"bad", fb:"As pás precisam de contato direto com a pele seca. Roupa impede a passagem do choque.", story:"O aparelho avisa 'verifique as pás'. Você perde tempo."},
   {t:"Esperar o SAMU chegar para só ele usar", next:"n4", q:"ok", fb:"O DEA é feito para leigos e fala o que fazer. Esperar reduz muito as chances.", story:"Um minuto se passa antes de alguém lembrar de usar o DEA."}
  ]},
  n4:{ text:"O DEA analisou e diz 'choque indicado, afaste-se'.", choices:[
   {t:"Conferir que ninguém toca Larissa, apertar o botão de choque e retomar compressões imediatamente", next:"endGood", q:"best", fb:"Afastar todos, apertar o botão e voltar logo à RCP. Continue até o aparelho falar de novo ou o SAMU assumir.", story:"O choque é dado. Você retoma as compressões e a equipe do SAMU chega."},
   {t:"Apertar o botão sem olhar ao redor", next:"endOk", q:"ok", fb:"Se alguém tocar, também leva o choque. Olhe e grite 'afastem-se' antes.", story:"Mateus encostava no braço dela e leva um susto. Dessa vez ninguém se feriu."},
   {t:"Não apertar e esperar o SAMU", next:"endBad", q:"bad", fb:"O choque indicado é o tratamento. Atrasar diminui muito a chance de sobreviver.", story:"Sem choque, o coração de Larissa continua sem ritmo até a chegada da equipe."}
  ]},
  endGood:{ end:true, tone:"good", title:"Segundos que valeram ouro", text:"Larissa teve o coração reativado com o choque e chegou viva ao hospital. Você ligou, comprimiu e usou o DEA sem perder tempo. Lição: reconhecer, ligar, comprimir, desfibrilar." },
  endOk:{ end:true, tone:"ok", title:"Ajuda a caminho", text:"O socorro foi feito, mas com atrasos e erros que poderiam ter custado caro. Lição: o DEA é simples, a RCP deve ser forte e a segurança vem antes do choque." },
  endBad:{ end:true, tone:"bad", title:"Tempo demais", text:"Sem compressões ou choque a tempo, Larissa chegou ao hospital em estado grave. Lição: PCR não espera. Ligue 192, comprima, use o DEA." }
 },
 safety:"Nunca simule choque do DEA em pessoas reais. Treine com aparelho de treinamento e boneco, com instrutor presencial."
},
{
 id:"s11", title:"Queda do escorregador", env:"park", module:"m8", theme:"Suspeita de fratura de punho", variation:1, diff:2,
 intro:"Domingo à tarde no parque. Você cuida do seu primo Enzo, de 9 anos, junto com Ana, sua amiga. Enzo escorrega do topo do escorregador e cai apoiando a mão no chão. Ele chora e segura o punho, que parece torto e já está inchando. O pai dele foi até a barraca de pipoca.",
 characters:[ {name:"Enzo", role:"primo, 9 anos"}, {name:"Ana", role:"amiga, 14 anos"}, {name:"Seu Jorge", role:"pai de Enzo"} ],
 problem:"Criança com punho deformado, dor intensa e inchaço após queda: suspeita de fratura fechada.",
 items:[
  {id:"a", kind:"child_down", x:40, y:76, label:"Enzo", note:"Está sentado no chão, chora e segura o punho. O punho parece torto e está inchando.", key:true},
  {id:"b", kind:"swing", x:72, y:64, label:"Balanço", note:"O brinquedo se mexe com o vento. Não oferece perigo imediato, mas afaste Enzo se necessário.", key:false},
  {id:"c", kind:"backpack", x:56, y:78, label:"Mochila de Ana", note:"Tem uma revista, um casaco e uma bandana. Servem para imobilização improvisada.", key:true},
  {id:"d", kind:"bottle", x:24, y:84, label:"Garrafa de água gelada", note:"Dá para usar como compressa, sempre com pano entre o frio e a pele.", key:true},
  {id:"e", kind:"bench", x:8, y:62, label:"Banco", note:"Um lugar à sombra para ele sentar sem mexer o braço.", key:false},
  {id:"f", kind:"phone", x:88, y:54, label:"Celular", note:"Ana pode ligar para o pai de Enzo ou para o 192 se piorar.", key:false}
 ],
 nodes:{
  start:{ text:"Enzo chora de dor e tenta mexer o punho. O que você diz e faz?", choices:[
   {t:"Puxar o punho de leve para endireitar", next:"r1", q:"bad", fb:"Nunca tente alinhar nem empurrar osso: você pode lesionar nervos e vasos. Mantenha como está.", story:"Enzo grita de dor. Você solta na hora."},
   {t:"Pedir que ele mexa os dedos para você ver se quebrou", next:"n2", q:"ok", fb:"Testar movimento aumenta a dor e pode piorar a lesão. É melhor manter o membro parado.", story:"Enzo chora mais e não consegue mexer. Você percebe que foi um erro."},
   {t:"Acalmar Enzo, pedir que não mexa o punho, deixá-lo na posição em que está e avisar Ana para chamar o responsável", next:"n2", q:"best", fb:"Acalmar, manter parado e avisar o responsável. Não alinhar nem testar o movimento.", story:"Enzo respira mais devagar. Ana vai chamar o pai dele."}
  ]},
  r1:{ text:"Enzo está mais assustado. Ana volta preocupada. O que faz agora?", choices:[
   {t:"Pedir desculpas, acalmá-lo, deixar o punho parado como está e chamar o pai", next:"n2", q:"best", fb:"Reconhecer e corrigir é bom. Mantenha o punho parado na posição encontrada.", story:"Aos poucos, ele se acalma."},
   {t:"Tentar de novo, com mais firmeza", next:"endBad", q:"bad", fb:"Insistir pode agravar a fratura e causar lesões em nervos e vasos.", story:"Enzo desmaia de dor."},
   {t:"Ignorar e esperar passar", next:"endOk", q:"ok", fb:"Fratura não passa sozinha. É preciso imobilizar e buscar atendimento.", story:"O inchaço aumenta rápido sem imobilização."}
  ]},
  n2:{ text:"Você vai imobilizar o punho. Como faz com o material da mochila de Ana?", choices:[
   {t:"Apoiar o punho e o antebraço sobre a revista enrolada, na posição encontrada, e prender sem apertar com a bandana, indo da mão ao antebraço", next:"n3", q:"best", fb:"Imobilizar na posição encontrada, com a articulação de cima e a de baixo apoiadas, sem apertar para não cortar a circulação.", story:"O punho fica firme. Enzo relaxa um pouco."},
   {t:"Envolver o punho com a bandana bem apertada", next:"n3", q:"bad", fb:"Apertar demais corta a circulação e aumenta o inchaço.", story:"Os dedos de Enzo ficam roxos e frios. Você afrouxa."},
   {t:"Colocar o braço numa tipoia, sem apoio rígido", next:"n3", q:"ok", fb:"A tipoia ajuda, mas sem apoio rígido a articulação ainda se mexe. Use um apoio firme.", story:"Enzo ainda sente dor ao mexer. Você precisa reforçar."}
  ]},
  n3:{ text:"O punho está bem inchado. O que fazer para aliviar a dor?", choices:[
   {t:"Colocar a garrafa de água gelada direto sobre a pele", next:"n4", q:"ok", fb:"O frio direto pode machucar a pele. Sempre ponha um pano entre o gelo e a pele.", story:"Enzo reclama de ardência e você coloca pano."},
   {t:"Esfregar pomada caseira no inchaço", next:"n4", q:"bad", fb:"Não passe substâncias sem orientação. Podem irritar a pele e atrapalhar a avaliação.", story:"Enzo faz careta, e o pai chega e pede para você parar."},
   {t:"Envolver a garrafa gelada num pano e apoiar sobre o punho imobilizado, por períodos curtos", next:"n4", q:"best", fb:"Frio com pano entre o gelo e a pele reduz inchaço e dor. Faça por períodos curtos, sem apertar.", story:"Enzo diz que a dor diminuiu um pouco."}
  ]},
  n4:{ text:"Seu Jorge chegou. Ele pergunta o que fazer agora.", choices:[
   {t:"Levar Enzo logo ao pronto-atendimento, mantendo o punho imobilizado, e ligar para o 192 se os dedos ficarem roxos, frios ou dormentes", next:"endGood", q:"best", fb:"Suspeita de fratura precisa de avaliação com raio-X. Ligue 192 se houver sinais de circulação comprometida ou piora importante.", story:"Seu Jorge leva Enzo ao pronto-atendimento. O raio-X confirma a fratura."},
   {t:"Dar um comprimido de dor da bolsa de Ana e ir para casa", next:"endBad", q:"bad", fb:"Leigo não dá remédio. E a fratura precisa de avaliação médica.", story:"A dor volta e o punho piora durante a noite."},
   {t:"Esperar um dia para ver se o inchaço melhora", next:"endOk", q:"ok", fb:"Com deformidade e dor intensa, a avaliação deve ser imediata. Esperar atrasa o tratamento.", story:"No dia seguinte levam Enzo ao hospital, com dor e inchaço maiores."}
  ]},
  endGood:{ end:true, tone:"good", title:"Imobilização exemplar", text:"Enzo recebeu atendimento rápido e engessou o punho. Você acalmou, imobilizou e usou frio com pano sem alinhar o osso. Lição: não mexa, imobilize e procure atendimento." },
  endOk:{ end:true, tone:"ok", title:"Atendimento atrasado", text:"Enzo foi tratado, mas com atraso e dor desnecessária. Lição: fratura precisa de imobilização e avaliação médica no mesmo dia." },
  endBad:{ end:true, tone:"bad", title:"Piora evitável", text:"A lesão piorou por manipulação ou omissão. Lição: nunca alinhe osso, nunca dê remédio e leve à avaliação médica." }
 },
 safety:"Pratique imobilização apenas com colegas saudáveis, sem pressão, e sempre sob supervisão do instrutor presencial."
},
{
 id:"s12", title:"Água fervente na cozinha", env:"home", module:"m9", theme:"Queimadura na mão por líquido quente", variation:1, diff:2,
 intro:"Você fica em casa com sua irmã Sofia, de 7 anos, enquanto sua mãe trabalha. A água do macarrão ferve na panela. Sofia puxa o cabo e a água escorre sobre a mão dela. Ela grita de dor e olha a pele ficando vermelha. A avó está no quarto.",
 characters:[ {name:"Sofia", role:"irmã, 7 anos"}, {name:"Vó Dalva", role:"avó, mora junto"}, {name:"Mãe (Cláudia)", role:"trabalha fora"} ],
 problem:"Criança de 7 anos com queimadura por água fervente na mão.",
 items:[
  {id:"a", kind:"child_stand", x:40, y:72, label:"Sofia", note:"Segura a mão e chora. A pele está vermelha e tem um anel e uma pulseira no punho.", key:true},
  {id:"b", kind:"stove", x:72, y:60, label:"Fogão", note:"A panela virou, mas o fogo continua aceso. Desligue.", key:true},
  {id:"c", kind:"pot", x:56, y:80, label:"Panela caída", note:"Água quente espalhada no chão. Há risco de escorregar.", key:false},
  {id:"d", kind:"bottle", x:24, y:76, label:"Pasta de dente", note:"Alguém sugere passar pasta de dente. Isso não deve ser feito.", key:true},
  {id:"e", kind:"table", x:8, y:58, label:"Mesa com panos", note:"Há panos de prato limpos e filme plástico na gaveta.", key:false},
  {id:"f", kind:"phone", x:88, y:56, label:"Celular", note:"Dá para ligar para a mãe ou para o 192 se for grave.", key:false}
 ],
 nodes:{
  start:{ text:"Sofia grita com a mão queimada. Qual é sua primeira ação?", choices:[
   {t:"Passar pasta de dente na pele para aliviar", next:"r1", q:"bad", fb:"Pasta de dente, manteiga e outras substâncias retêm calor, sujam e atrapalham o atendimento. O correto é água corrente.", story:"A pasta cobre a pele e Sofia chora ainda mais."},
   {t:"Colocar a mão dela na água corrente da pia, em temperatura ambiente, desligar o fogo e chamar Vó Dalva", next:"n2", q:"best", fb:"Resfriar com água corrente em temperatura ambiente por cerca de 10 a 20 minutos reduz a profundidade da lesão.", story:"A dor diminui com a água. Vó Dalva vem correndo."},
   {t:"Abrir a torneira por um instante e secar logo", next:"n2", q:"ok", fb:"A água precisa correr por 10 a 20 minutos para surtir efeito. Poucos segundos não bastam.", story:"A dor volta quando ela tira a mão da água."}
  ]},
  r1:{ text:"Você percebe que passar pasta foi um erro. Sofia ainda chora.", choices:[
   {t:"Lavar a pasta em água corrente em temperatura ambiente e manter a mão resfriando", next:"n2", q:"best", fb:"Tire a substância com água corrente e continue resfriando. Corrija e siga.", story:"A água leva a pasta e alivia a dor."},
   {t:"Cobrir com mais pasta", next:"endBad", q:"bad", fb:"Piora a lesão e dificulta o atendimento médico.", story:"A pele fica cheia de bolhas."},
   {t:"Deixar secar e esperar", next:"endOk", q:"ok", fb:"Sem resfriamento a queimadura se aprofunda.", story:"A dor persiste e a pele vai ficando pior."}
  ]},
  n2:{ text:"A mão está resfriando. Sofia usa um anel e uma pulseira, e o punho começa a inchar.", choices:[
   {t:"Puxar o anel com força antes que inche mais", next:"n3", q:"bad", fb:"Forçar machuca mais a pele queimada. Se não sair com facilidade, deixe e avise o atendimento.", story:"Sofia grita e a pele se machuca."},
   {t:"Retirar o anel e a pulseira com delicadeza enquanto a água corre; se não saírem, não forçar", next:"n3", q:"best", fb:"Joias podem apertar quando incha e cortar a circulação. Tire com cuidado logo no início, durante o resfriamento.", story:"As peças saem com facilidade, e a mão segue na água por vários minutos."},
   {t:"Deixar as joias, o importante é a água", next:"n3", q:"ok", fb:"O resfriamento é essencial, mas as joias devem sair antes do inchaço. Depois pode ficar impossível.", story:"O dedo incha e o anel fica preso."}
  ]},
  n3:{ text:"Passaram cerca de 15 minutos. Apareceu uma bolha no dorso da mão. O que faz?", choices:[
   {t:"Estourar a bolha com uma agulha", next:"n4", q:"bad", fb:"Bolhas protegem contra infecção. Não estoure.", story:"Sofia chora, e a pele fica aberta."},
   {t:"Cobrir com pano limpo ou filme plástico, sem apertar", next:"n4", q:"best", fb:"Cubra solto, com pano limpo ou filme plástico, para proteger sem aderir à pele.", story:"A mão fica protegida e Sofia se acalma."},
   {t:"Passar manteiga para não grudar", next:"n4", q:"bad", fb:"Manteiga retém calor e aumenta o risco de infecção.", story:"Vó Dalva interrompe e manda limpar."}
  ]},
  n4:{ text:"Sofia está mais calma, mas a mão dói. Você liga para sua mãe. O que decidem?", choices:[
   {t:"Esperar para ver se melhora até amanhã", next:"endOk", q:"ok", fb:"Queimadura em mão e em criança deve ser avaliada por médico, mesmo parecendo leve.", story:"No dia seguinte a bolha está maior e levam Sofia ao posto."},
   {t:"Procurar atendimento médico agora, mantendo a mão coberta", next:"endGood", q:"best", fb:"Mãos, rosto, genitais, crianças, grande extensão, elétrica ou química: procure atendimento. Se piorar muito, ligue 192.", story:"A mãe volta correndo e leva Sofia à UPA. O médico elogia o resfriamento."},
   {t:"Passar creme de beleza e ir dormir", next:"endBad", q:"bad", fb:"Cremes não resolvem e podem infeccionar. Sem avaliação, a queimadura pode se agravar.", story:"Na manhã seguinte a mão infeccionou."}
  ]},
  endGood:{ end:true, tone:"good", title:"Resfriou e cuidou", text:"Sofia teve queimadura de segundo grau pequena e cicatrizou bem. Você resfriou, tirou as joias, cobriu e buscou atendimento. Lição: água corrente, nada de substâncias, ajuda médica." },
  endOk:{ end:true, tone:"ok", title:"Poderia ser melhor", text:"Sofia se recuperou, mas com mais dor e demora. Lição: resfrie por 10 a 20 minutos e procure atendimento para mãos e crianças." },
  endBad:{ end:true, tone:"bad", title:"Piorou em casa", text:"A lesão se agravou por substâncias inadequadas e falta de atendimento. Lição: nada de pasta de dente, manteiga ou gelo. Água corrente e médico." }
 },
 safety:"Em casa, mantenha cabos de panela virados para dentro e crianças longe do fogão. Nunca pratique com água quente real."
},
{
 id:"s13", title:"Fio descascado na reforma", env:"school", module:"m10", theme:"Choque elétrico", variation:1, diff:3,
 intro:"A quadra da escola está em reforma. No intervalo, Tiago, de 14 anos, pega uma extensão com o fio descascado para ligar uma caixa de som. Ele fica preso, tremendo, sem conseguir soltar. O chão está molhado por causa da limpeza. Você está a dois metros dele.",
 characters:[ {name:"Tiago", role:"colega, 14 anos"}, {name:"Camila", role:"colega, 14 anos"}, {name:"Seu Valdir", role:"pedreiro da obra"}, {name:"Profa. Sandra", role:"coordenadora"} ],
 problem:"Um colega está preso a uma extensão elétrica com fio descascado, em chão molhado.",
 items:[
  {id:"a", kind:"person_stand", x:40, y:70, label:"Tiago", note:"Está tremendo, com a mão agarrada ao fio. Não consegue se soltar.", key:true},
  {id:"b", kind:"wire", x:56, y:80, label:"Fio descascado", note:"O fio está exposto e energizado. Qualquer um que tocar pode levar choque.", key:true},
  {id:"c", kind:"puddle", x:24, y:82, label:"Poça d'água", note:"A água no chão conduz eletricidade. Não pise perto.", key:true},
  {id:"d", kind:"outlet", x:72, y:56, label:"Quadro de luz", note:"O quadro geral com disjuntores fica a poucos metros. Seu Valdir sabe desligar.", key:false},
  {id:"e", kind:"cone", x:8, y:62, label:"Cone de obra", note:"Sinalização que marca a obra. Não ajuda agora.", key:false},
  {id:"f", kind:"sign", x:88, y:58, label:"Placa de obra", note:"Avisa sobre perigo. Há risco real de choque.", key:false}
 ],
 nodes:{
  start:{ text:"Tiago está preso ao fio. Qual é sua primeira reação?", choices:[
   {t:"Empurrar Tiago com a mão para soltá-lo", next:"r1", q:"bad", fb:"Quem toca em alguém energizado também recebe a corrente. Nunca toque na vítima enquanto houver energia.", story:"Você recua no último segundo, sentindo o formigamento do ar."},
   {t:"Não tocar, gritar para os colegas se afastarem e pedir a Seu Valdir que desligue o quadro geral", next:"n2", q:"best", fb:"Segurança da cena primeiro: não toque, afaste pessoas e desligue a energia na origem.", story:"Seu Valdir corre até o quadro e abaixa os disjuntores. O som para e Tiago cai."},
   {t:"Gritar para Tiago soltar o fio", next:"n2", q:"ok", fb:"Gritar não resolve. Ele está preso por contração muscular. Desligue a energia.", story:"Tiago não consegue soltar. Você gasta segundos e Seu Valdir chega."}
  ]},
  r1:{ text:"Você escapou por pouco. Camila grita. O que faz?", choices:[
   {t:"Gritar para todos se afastarem e chamar Seu Valdir para desligar o quadro geral", next:"n2", q:"best", fb:"Corrigir a tempo é possível. Segurança da cena e desligar a energia.", story:"Seu Valdir desliga. Tiago cai no chão."},
   {t:"Tentar tirar o fio com uma vassoura de madeira molhada", next:"endBad", q:"bad", fb:"Material molhado conduz energia. Nunca improvise assim.", story:"Você recebe um choque forte e cai."},
   {t:"Esperar que a energia caia sozinha", next:"endOk", q:"ok", fb:"A energia só cai ao ser desligada. Esperar é arriscado.", story:"A professora chega e desliga. Tiago ficou mais tempo preso do que devia."}
  ]},
  n2:{ text:"A energia foi desligada. Tiago caiu de joelhos, pálido. O fio ainda está no chão.", choices:[
   {t:"Ligar para o 192 informando choque elétrico e, se houver incêndio, acionar também o 193", next:"n3", q:"best", fb:"Choque elétrico, mesmo sem sinais graves, exige avaliação médica. O 192 orienta e despacha a ambulância.", story:"O 192 atende e pede para manter todos longe do fio."},
   {t:"Levar Tiago logo para a sala com colegas", next:"n3", q:"bad", fb:"Mover sem avaliar pode piorar. Primeiro peça ajuda e avalie respiração e consciência.", story:"Tiago tropeça e quase cai de novo."},
   {t:"Esperar para ver se ele fica bem", next:"n3", q:"ok", fb:"O coração pode ser afetado horas depois. O 192 deve ser chamado.", story:"Alguns minutos passam sem ajuda a caminho."}
  ]},
  n3:{ text:"Tiago está acordado, com queimaduras pequenas na palma da mão e muito assustado. Como cuida dele?", choices:[
   {t:"Dar água e mandá-lo andar para espairecer", next:"n4", q:"bad", fb:"Ele pode piorar de repente. Deve ficar quieto, deitado ou sentado, sem comer ou beber.", story:"Tiago fica tonto ao andar."},
   {t:"Colocar a mão debaixo de água corrente só por um segundo e levá-lo para a sala", next:"n4", q:"ok", fb:"O resfriamento rápido não basta e levá-lo atrapalha. Deixe-o quieto e cubra a queimadura.", story:"Ele sente ardência. Você interrompe."},
   {t:"Deixá-lo deitado e quieto, cobrir a queimadura com pano limpo, observar a respiração e falar com ele", next:"n4", q:"best", fb:"Deite, cubra a queimadura sem apertar, observe a respiração e fale com calma até a ambulância.", story:"Tiago relaxa. Camila avisa a coordenação."}
  ]},
  n4:{ text:"Tiago diz: 'Estou bem, quero voltar para a aula'. A ambulância ainda não chegou.", choices:[
   {t:"Concordar e deixá-lo ir", next:"endBad", q:"bad", fb:"Choque elétrico pode causar arritmia mesmo sem sinais. Não deixe sair sem avaliação.", story:"Ele passa mal no corredor."},
   {t:"Insistir que ele espere deitado, avisar a coordenação e aguardar o SAMU observando", next:"endGood", q:"best", fb:"Mesmo bem, ele precisa de avaliação médica. Observe respiração e consciência. Se parar de responder e respirar normalmente, inicie RCP e peça o DEA.", story:"O SAMU chega e leva Tiago para avaliação cardíaca."},
   {t:"Deixá-lo sentar na secretaria sem ninguém por perto", next:"endOk", q:"ok", fb:"Ele deve ser vigiado o tempo todo. Se piorar, alguém precisa perceber.", story:"Ele fica bem, mas a coordenadora se assusta ao ver que ninguém vigiava."}
  ]},
  endGood:{ end:true, tone:"good", title:"Cena segura, vida salva", text:"Tiago foi avaliado e teve só queimaduras leves. Você não tocou, desligou a energia, acionou o 192 e o observou. Lição: segurança da cena e avaliação médica sempre." },
  endOk:{ end:true, tone:"ok", title:"Escapou, mas...", text:"Tiago ficou bem, mas houve atrasos. Lição: desligue a energia, chame o 192 e nunca deixe a vítima sozinha." },
  endBad:{ end:true, tone:"bad", title:"Segundo acidente", text:"A falta de cuidado causou outro acidente ou piora. Lição: nunca toque em quem está energizado. Desligue a energia primeiro." }
 },
 safety:"Nunca toque em vítima em contato com a eletricidade. Em fio caído de alta tensão, mantenha distância e ligue 193. Nada de teste com eletricidade real."
},
{
 id:"s14", title:"Tombo de quadriciclo", env:"field", module:"m11", theme:"Estado de choque após trauma e sangramento", variation:1, diff:3,
 intro:"Você passa as férias na fazenda do tio Adelino. Seu primo Gustavo, de 16 anos, dirige o quadriciclo numa estrada de terra, perde o controle e tomba. Você, sua prima Helena e o tio correm até ele. O motor ainda está ligado. Gustavo está caído, de capacete, e o sinal de celular é fraco.",
 characters:[ {name:"Gustavo", role:"primo, 16 anos"}, {name:"Helena", role:"prima, 13 anos"}, {name:"Tio Adelino", role:"dono da fazenda"} ],
 problem:"Um adolescente sofre acidente de quadriciclo, com sangramento e sinais de estado de choque, em área rural.",
 items:[
  {id:"a", kind:"person_down", x:40, y:76, label:"Gustavo", note:"Está deitado, de capacete, pálido, suado, com a pele fria e o pulso rápido. Há sangramento no braço.", key:true},
  {id:"b", kind:"bike_down", x:56, y:70, label:"Quadriciclo tombado", note:"O motor ainda está ligado e pode vazar combustível. Desligue com cuidado.", key:true},
  {id:"c", kind:"helmet", x:24, y:84, label:"Capacete", note:"Gustavo ainda usa o capacete. Não o retire sem necessidade.", key:true},
  {id:"d", kind:"backpack", x:72, y:78, label:"Mochila", note:"Tem um casaco e panos limpos, bons para pressionar e aquecer.", key:false},
  {id:"e", kind:"phone", x:88, y:62, label:"Celular de Helena", note:"O sinal está fraco. Procure o ponto com sinal e informe referências do local.", key:false},
  {id:"f", kind:"tree", x:8, y:58, label:"Árvore", note:"Dá sombra. Não é necessário mover Gustavo até lá.", key:false}
 ],
 nodes:{
  start:{ text:"Você chega à cena. O motor roda e Gustavo está caído. O que faz primeiro?", choices:[
   {t:"Desligar o motor com cuidado ou pedir ao tio, olhar se há fogo ou vazamento e só então se aproximar", next:"n2", q:"best", fb:"Segurança da cena primeiro: motor desligado e sem risco de fogo. Só então avalie a vítima.", story:"O tio desliga a chave. Você se aproxima com calma."},
   {t:"Puxar Gustavo pelos ombros para longe do quadriciclo", next:"r1", q:"bad", fb:"Mover sem necessidade pode agravar lesão de coluna. Mova só se houver perigo imediato, como fogo, e pelo eixo do corpo.", story:"Gustavo geme de dor e você percebe que agiu cedo demais."},
   {t:"Correr direto a Gustavo sem olhar a cena", next:"n2", q:"ok", fb:"Chegar rápido é bom, mas olhar a cena evita um segundo acidente. Motor ligado e combustível são riscos.", story:"Você chega, mas o tio avisa do motor ligado e desliga."}
  ]},
  r1:{ text:"Gustavo reclama de dor no pescoço. Tio Adelino pede calma.", choices:[
   {t:"Deixar Gustavo parado como está, pedir que não mexa a cabeça e avaliar o resto com calma", next:"n2", q:"best", fb:"Se há dor no pescoço, imobilize e não mova. Só mova se houver perigo.", story:"Gustavo se acalma e o tio desliga o motor."},
   {t:"Sentá-lo e dar água", next:"endBad", q:"bad", fb:"Sentar pode piorar lesão de coluna, e água é proibida pois pode precisar de cirurgia.", story:"Ele fica tonto e vomita."},
   {t:"Chamar ajuda sem avaliar mais nada", next:"endOk", q:"ok", fb:"Chamar ajuda é bom, mas Gustavo ainda precisa de cuidados enquanto aguarda.", story:"A ajuda é chamada, mas o sangramento segue."}
  ]},
  n2:{ text:"Gustavo está consciente, com sangramento no braço e capacete. O que faz primeiro?", choices:[
   {t:"Pressionar o ferimento com pano limpo, sem soltar, enquanto Helena procura sinal para ligar para o 192 informando a localização", next:"n3", q:"best", fb:"Controle o sangramento com pressão direta e acione o 192 informando local e referências, mesmo que seja preciso buscar sinal.", story:"O sangramento diminui. Helena consegue sinal no alto do morro e liga."},
   {t:"Tirar o capacete para ver melhor", next:"n3", q:"bad", fb:"Leigo não retira o capacete, salvo necessidade de via aérea ou RCP e, se possível, por quem foi treinado. Pode agravar lesão de pescoço.", story:"O tio impede você a tempo."},
   {t:"Amarrar um cinto bem apertado no braço", next:"n3", q:"ok", fb:"Torniquete só é último recurso para hemorragia grave de membro, idealmente por quem treinou. Aqui a pressão direta resolve.", story:"O cinto machuca e Gustavo reclama. Você troca por pressão."}
  ]},
  n3:{ text:"Gustavo está pálido, suado, com a respiração rápida e sonolento. Pede água. O que faz?", choices:[
   {t:"Dar água aos poucos para ele se recuperar", next:"n4", q:"bad", fb:"Nada por via oral: ele pode precisar de cirurgia, pode vomitar e engasgar.", story:"Ele tosse e você para de dar."},
   {t:"Mantê-lo deitado como está, agasalhar com o casaco, continuar pressionando e acompanhar a respiração", next:"n4", q:"best", fb:"Choque: deitar, aquecer, controlar o sangramento, nada de água. Com queda de grande impacto, não eleve pernas nem mova por suspeita de coluna.", story:"Gustavo se aquece e a respiração fica mais calma."},
   {t:"Levantar as pernas dele para melhorar a circulação", next:"n4", q:"ok", fb:"Elevar pernas só se não houver suspeita de trauma de coluna ou cabeça. Em queda de quadriciclo, é mais seguro não mover.", story:"Gustavo reclama de dor nas costas. Você retorna à posição."}
  ]},
  n4:{ text:"O SAMU está a caminho, mas vai demorar. Tio Adelino propõe levar Gustavo na caminhonete.", choices:[
   {t:"Deitar Gustavo na caçamba e partir para a cidade", next:"endBad", q:"bad", fb:"Transportar sem necessidade e sem imobilização pode agravar a lesão. Sem perigo, aguarde o SAMU.", story:"A estrada de terra sacode Gustavo, que grita de dor."},
   {t:"Manter Gustavo parado, pressionando o braço e agasalhado, e aguardar o SAMU, deixando o tio no acesso para guiar a ambulância", next:"endGood", q:"best", fb:"Mova só se houver perigo imediato. Aguardar o SAMU, com cuidados contínuos, é mais seguro.", story:"O SAMU chega, imobiliza e leva Gustavo."},
   {t:"Combinar com o tio de ir de carro só se ele piorar muito", next:"endOk", q:"ok", fb:"O plano é razoável, mas confie nas orientações do 192 e não prometa mover sem imobilização. Siga o protocolo ensinado pelo instrutor presencial.", story:"Gustavo é levado pela ambulância sem piora, mas houve dúvida."}
  ]},
  endGood:{ end:true, tone:"good", title:"Cuidado até o fim", text:"Gustavo chegou ao hospital estável. Você garantiu a cena, controlou o sangramento, aqueceu e não o moveu. Lição: segurança, pressão, calor e esperar o SAMU." },
  endOk:{ end:true, tone:"ok", title:"Ajuda tardia", text:"Gustavo foi socorrido, mas houve riscos desnecessários. Lição: avalie a cena, chame o 192 cedo e evite mover sem perigo." },
  endBad:{ end:true, tone:"bad", title:"Piora no caminho", text:"A movimentação e a falta de cuidados pioraram o quadro de Gustavo. Lição: não mova sem perigo, nada de água, controle o sangramento e espere o SAMU." }
 },
 safety:"Nunca ande de quadriciclo sem capacete e sem habilitação ou supervisão. Pratique cuidados com choque apenas em simulação sob orientação do instrutor."
}
);
