var gatinho, gatinhoCorrendo, gatinhoMorrendo, gatinhoPulando
var arvore, arvoreImg, arvore2, arvore2Img
var obstaculo, obstaculoImg
var columeloImg, columelo2Img
var arbusto1, arbusto1Img
var arbusto2, arbusto2Img
var arbusto3, arbusto3Img
var arbusto4, arbusto4Img
var placa, placaImg, placa2, placa2Img
var fundo, fundoImg
var chão, chãoImg
var chãoInvisivel
var restart, recomecar
var gameOver, fimDeJogo

var pontuacao = 0

var JOGAR=1
var ENCERRAR=0
var estadoJogo=JOGAR


function preload(){
    //animação do gato correndo
    gatinhoCorrendo = loadAnimation ("Run (1).png","Run (2).png", "Run (3).png", "Run (4).png", "Run (5).png", 
    "Run (6).png", "Run (7).png", "Run (8).png")
    
    gatinhoMorrendo = loadImage ("Dead (10).png")

    gatinhoPulando = loadAnimation ("Jump (1).png", "Jump (2).png", "Jump (3).png", "Jump (4).png", 
    "Jump (5).png", "Jump (6).png", "Jump (7).png", "Jump (8).png", )

    //imganes das árvores
    arvoreImg = loadImage("Tree_1.png")
    arvore2Img = loadImage("Tree_2.png")
    
    //imagens do obstáculo
    obstaculoImg = loadImage("Crate.png")
    
    //imagem dos cogumelos
    columeloImg = loadImage("Mushroom_1.png")
    columelo2Img = loadImage("Mushroom_2.png")
    
    //imagens dos orbustos
    arbusto1Img = loadImage("Bush (1).png")
    arbusto2Img = loadImage("Bush (2).png")
    arbusto3Img = loadImage("Bush (3).png")
    arbusto4Img = loadImage("Bush (4).png")
    
    //imagem do chão
    fundoImg = loadImage("fundo-.png")

    //imagem do chão
    chãoImg=loadImage("chão.png")

    fimDeJogo=loadImage("gameO.png")

    recomecar=loadImage("restart.png")
  
}

function setup() {
   //criando o espaço do jogo 
 createCanvas(850,550);


//criando o fundo
fundo=createSprite(900,335)
fundo.addImage("BG", fundoImg)
fundo.scale=1

//criando o chão
chão=createSprite(50,500,20,20)
chão.addImage("chão", chãoImg)
chão.scale=1

//criando o chão invisível
chãoInvisivel=createSprite(300,450,800,5)
chãoInvisivel.visible=false

 //criando o gato
 gatinho=createSprite(80,400,20,20)
 gatinho.addAnimation("Run", gatinhoCorrendo)
 gatinho.addAnimation("Jump", gatinhoPulando)
 gatinho.addImage("Dead", gatinhoMorrendo)
gatinho.scale = 0.3;
gatinho.debug=false
gatinho.setCollider("rectangle",0,100,100,230)

restart=createSprite(410,260,20,20)
restart.addImage(recomecar)
restart.scale=0.027
restart.visible=false

gameOver=createSprite(425,220,20,20)
gameOver.addImage(fimDeJogo)
gameOver.scale=1
gameOver.visible=false

//criando os arbustos
gArbustos= new Group()
gColumelos= new Group()
gArvores= new Group()


}

function draw() {
    //papel de parede
 background(180);


 gatinho.collide(chãoInvisivel)
 gatinho.velocityY = gatinho.velocityY + 0.8


if(estadoJogo==JOGAR){

  pontuacao=pontuacao+Math.round((frameRate()/60))
  if(keyDown("space") && gatinho.y >= 380){
    gatinho.velocityY=-14
  }
  if (chão.x < 0){
    chão.x = chão.width/2;
  }
 chão.velocityX=-(10+pontuacao/100)
 fundo.velocityX=-(3+pontuacao/100)

 if(fundo.x < 0){
    fundo.x=fundo.width/2;


}

GerarColumelos();
if(gColumelos.isTouching(gatinho)){
  estadoJogo=ENCERRAR

}
}
else if(estadoJogo==ENCERRAR){
  chão.velocityX = 0;
  fundo.velocityX=0
  gatinho.velocityY=0
  gColumelos.setVelocityXEach(0)
  gColumelos.setLifetimeEach(-2)
  gatinho.changeImage("Dead", gatinhoMorrendo)
  restart.visible=true
  gameOver.visible=true
  if(mousePressedOver(restart)){
    reset();
  }

}

 //desenha os sprites
 drawSprites();
 text("pontuação:"+pontuacao,750,50)
}

function GerarColumelos() {
    //escreva o código aqui para gerar as nuvens
    if (frameCount%90===0){
      var columelos=createSprite(860,430,10,40)
      columelos.velocityX=-(9+pontuacao/100)
      var rand=Math.round(random(1,2))
      switch(rand){
        case 1:columelos.addImage(columeloImg);
        break;
        case 2:columelos.addImage(columelo2Img);
        break;
        default:break
      }
      columelos.scale=0.9
      columelos.lifetime=850
      gColumelos.add(columelos)
      }
      
      }

      function reset(){
        estadoJogo = JOGAR
        gatinho.changeAnimation("Run", gatinhoCorrendo)
  gColumelos.destroyEach()
  pontuacao = 0
  restart.visible=false
  gameOver.visible=false
      }