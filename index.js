const express = require("express");
const path = require("path");
require('dotenv').config();
const app = express();
const port = 3000;

let message = "";

const catalogo = [
{
  id:"1",
  imagem: "/img/herculoides.jpg",
  nome: "Herculóides",
  ano: "1967",
  personagens: "Zandor, Tara (mulher de Zandor), Dorno (filho do casal), Zok (dragão alado), Igor (gorila de pedra), Tundro (rinoceronte), Gloop e Gleep (criaturas de material elástico)",
  criador: "Alex Toth", 
  emissoras: "TV Tupi, TV Record, TV Bandeirantes, TV Manchete",
  sinopse: "No distante e estranho planeta Quasar, com enormes plantas e monstros interplanetários, vive a família Herculóides e frequentemente esse planeta é atacado por alienígenas e forças inimigas afim de conquistá-lo. Para defender sua morada, o rei Zandor, conta com um super-estilingue e um escudo de múltiplas utilidades."  
},
{
  id:"2",
  imagem:"/img/caverna-do-dragao.jpg",
  nome: "Caverna do Dragão",
  ano: "1983", 
  personagens: "Hank (arco mágico capaz de criar flechas energéticas), Eric (escudo capaz de criar um campo de força), Diana (um bastão usado em saltos e acrobacias), Sheila (capuz que lhe dá invisibilidade), Presto (um chapéu de feiticeiro atrapalhado), Bobby (irmão de Sheila, tacape cujo golpe era muito forte), Mestre dos Magos (guia dos garotos que fornecia informações cifradas), Uni (filhote fêmea de unicórnio), Vingador (feiticeiro maléfico)",
  criador: "Kevin Paul Coates, Mark Evanier, Dennis Marks",
  emissoras: "Rede Globo, Fox Kids",
  sinopse: "A história começa em um parque de diversões, quando seis amigos adolescentes resolvem ingressar na nova atração do local o brinquedo Dungeons & Dragons, uma espécie de trem fantasma. Ao entrarem numa montanha eles são transportados para um mundo místico, com calabouços e dragões que tentam voltar pra casa, mas eles não sabem o caminho de volta e só uma pessoa parece poder ajudá-los."
},
{
  id:"3",
  imagem:"/img/joao-grandao.jpg",
  nome: "João Grandão",
  ano: "1977",
  personagens: "João Grandão (gorila roxo gigantesco), Espirro (cachorro da raça Beagle amarelo)",
  criador: "William Hanna, Joseph Barbera",
  emissoras: "TVS (SBT), Rede Manchete",
  sinopse: "Conta a história sobre um gorila e um cachorro que vivem as maiores aventuras juntos por todos os lugares em que viajam no seu veículo próprio, onde o cachorro usa um chapéu e seria o cérebro da dupla e o gorila que só tem tamanho mesmo, mas é inocente e gostava muito de Uvas."
},
{
  id:"4",
  imagem:"/img/pica-pau.jpg",
  nome:"Pica-Pau",
  ano: "1996",
  personagens: "O Pica-pau (personagem esperto, falante e atrevido), Zeca Urubu, Leôncio, Pé de Pano, Zé Jacaré, Meany Ranheta (observadora de pássaros)",
  criador: "Walter Lantz",
  emissoras: "TV Record, SBT e Rede Globo",
  sinopse: "O Pica-pau é um personagem esperto, que possui a intenção de levar a sua vida numa boa, em sua casinha num tronco de árvore, ou voando por aí picando madeira, o que geralmente perturba alguém e é nessa hora que o Pica-pau não fica por baixo fazendo de tudo para sacanear o seu opositor, transformando-se num ser sem pudor ou ética."
},
{
  id:"5",
  imagem:"/img/impossiveis.jpg",
  nome: "Os Impossíveis",
  ano: "1967",
  personagens: "Coil, baixinho e gordinho e líder do grupo (capaz de transformar os braços e as pernas em molas), Multi-Homem, cabelo sempre cobrindo seus olhos (capaz de duplicar a si mesmo criando inúmeras cópias igualzinhas), Homem-Fluido, usava uma máscara de mergulho (capacidade de transformar seu corpo em liquido)",
  criador: "Hanna-Barbera",
  emissoras: "Rede Manchete, TV Bandeirantes e SBT",
  sinopse: "Um trio de roqueiros integrantes de uma banda que esconde secretamente a identidade de um grupo de super-heróis. Quando existe alguma ameaça, a equipe entra em ação e se transforma numa trinca de super-heróis bem divertidos prontos para combater os vilões, com eficiência as ordens do chefe Big D."
},
{
  id:"6",
  imagem:"/img/thundercats.jpg",
  nome: "ThunderCats",
  ano: "1985",
  personagens: "Lion, o líder (portador de duas armas - uma luva metálica, capaz de refletir e deter raios e Espada Justiceira, onde está o olho de Thundera que pode invocar todos os seus amigos e também ter um aviso do perigo), Panthro (excelente mecânico e mestre em artes marciais que usa seu nunchaku), Tygra ( calmo cientista possui um chicote-boliadeira que o torna invisível ), Cheetara (capaz de desenvolver alta velocidade e possui um bastão acrobático), Wilykit e Wilykat, são irmãos (possuem bombas de gás e pranchas voadoras), Snarf (responsável pelo lado cômico), Mumm-Ra (semelhante a uma múmia que vive numa pirâmide mística), Escamoso, Abutre,  Simiano e Chacal",
  emissoras: "Rede Globo e SBT",
  sinopse: "Com a destruição do planeta Thundera, os ThunderCats são forçados a fugir de seu planeta natal e acordam no Terceiro Mundo e pouco tempo depois, os Mutantes também chegam e ao tomar conhecimento do poder do Olho de Thundera, o feiticeiro demoníaco mumificado recruta os mutantes para ajudá-lo a adquirir."
},
{
  id:"7",
  imagem:"/img/corrida-maluca.jpg",
  nome: "Corrida Maluca", 
  ano: "1969",
  personagens: "Carro 00 - Dick Vigarista e Mutley (o plano dos dois vilões é vencer trapaceando os outros competidores, mas nunca venceram), Carro 1 - Irmãos Rocha, Carro 2 - O Cupê Mal-Assombrado, Carro 3 - Professor Aéreo, Carro 4 - Barão Vermelho, Carro 5 - Penélope Charmosa, Carro 6 - Carro-Tanque, Carro 7 - Quadrilha da Morte, Carro 8 - O Caipira Luke, Carro 9 - Peter Perfeito, Carro 10 - Rufus Lenhador",
  criador: "Jerry Eisenberg e Iwao Takamoto",
  emissoras: "TV Tupi, Rede Globo, TV Bandeirantes, TV Manchete, SBT",
  sinopse: "Disputando o título de ‘O Corredor Mais Louco do Mundo’, os carros correm por diversas estradas, cheias de obstáculos e perigos, onde os competidores usavam tudo que seu veículo lhe proporcionava para fugir dos obstáculos da corrida, exceto por um competidor, o Dick Vigarista, que preferia passar a maior parte do tempo inventando armadilhas."
},
{
  id:"8",
  imagem:"/img/frankenstein-jr.jpg",
  nome: "Frankenstein Jr",
  ano: "1968",
  personagens: "O cientista garoto Buzz (Bob no Brasil) e um robô poderoso chamado de Frankenstein Jr.",
  criador: "Willian Hanna e Joseph Barbera",
  emissoras: "Rede Manchete, SBT",
  sinopse: "Frankenstein Jr. foi criado pelo jovem cientista Bob Conroy e quando o mundo estava correndo perigo, o pequeno Bob apontava seu anel de controle remoto e ativava Frank, sentava no ombro do robô e os dois saíam pela enorme porta do laboratório para combater o mal, sempre com Bob dando dicas ao Frank de como proceder na luta. O gigantesco robô possuía grandes habilidades, como voar através de jatos embutidos em seus pés, além de poder emitir raios destruidores através dos dedos das mãos."
},
{
  id:"9",
  imagem:"/img/sawamu-demolidor.jpg",
  nome: "Sawamu o Demolidor",
  ano: "1970",
  personagens: "Tadashi Sawamura (leia ‘Sauamura’), um atleta muito famoso no Japão do final dos anos 60",
  criador: "Daiji Kazumine e Kentaro Nakajiro",
  emissoras: "TV Gazeta, TV Record",
  sinopse: "Sawamu é um arrogante campeão de caratê, um lutador medíocre mas esforçado que sofre uma humilhante derrota perante Soman, um lutador que estava no Japão para divulgar o boxe estilo tailandês. Ao sair da luta completamente arrebentado, Sawamu toma uma importante decisão: dedicar-se austeramente ao aprendizado da nova técnica, rebatizada de chute-boxe, ele isola-se nas montanhas e lembra dos ensinamentos do avô."
}];


app.use(express.urlencoded());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", {
    catalogo,
  });
});

app.get("/detalhe/:id", (req, res) => {
  const id = parseInt(req.params.id); 
  const desenho =  catalogo[id];
  res.render("detalhe", {desenho});
});

app.get("/criar", (req, res) =>{
  res.render("criar");
});

app.post("/criar", (req, res) => {
  const { imagem, nome, ano, personagens, criador, emissoras, sinopse } = req.body;  
    res.redirect("/");
  
});

app.get("/editar/:id", (req, res) => {
  const desenho = parseInt(req.params.id)
  res.render("editar")
 
});

app.post("/editar/:id", (req, res) => {

  const { imagem, nome, ano, personagens, criador, emissoras, sinopse } = req.body;

  // desenho.imagem = imagem;
  // desenho.nome = nome;
  // desenho.ano = ano;
  // desenho.personagens = personagens;
  // desenho.criador = criador;
  // desenho.emissoras = emissoras;
  // desenho.sinopse = sinopse;

  res.render("editar", {
    desenho,
  })
});



// app.post("/inscrever", (req, res) => {
//   const {nome, imagem, periodo, local, tamanho, alimentacao, descricao} = req.body;

//   catalogo.push({
//     nome,
//     imagem,
//     periodo,
//     local,
//     tamanho,
//     alimentacao,
//     descricao,
//   });

//   res.redirect("/");

// });



app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);