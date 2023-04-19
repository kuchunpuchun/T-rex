var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var score = 0;
var todosCAC
var game = "play";
var todosN
var score;
var overIMG
var restartIMG
var highScore = 0;
function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadAnimation("trex_collided.png");
  image_clouds = loadImage("cloud.png");
  groundImage = loadImage("ground2.png");
  cac1 = loadImage("obstacle1.png");
  cac2 = loadImage("obstacle2.png");
  cac3 = loadImage("obstacle3.png");
  cac4 = loadImage("obstacle4.png");
  cac5 = loadImage("obstacle5.png");
  cac6 = loadImage("obstacle6.png");
  RIMG = loadImage("restart.png");
  OIMG = loadImage("gameOver.png");
  jumpSound = loadSound("jump.mp3");
  gameOverSound = loadSound("die.mp3");
  checkpointSound = loadSound("checkPoint.mp3");
}

function setup() {

  createCanvas(windowWidth,windowHeight);
  

  Iground = createSprite(windowWidth/2,windowHeight-20)
  Iground.velocityX = -6
  Iground.addImage("ground",groundImage)
  Iground.lifetime = 3000
  //crear sprite de trex
  trex = createSprite(50,windowHeight-40,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;



  //crear sprite de suelo invisible
  invisibleGround = createSprite(200,windowHeight-10,400,10);
  invisibleGround.visible = false;
  
  CAC = [cac1,cac2,cac3,cac4,cac5,cac6];
 
  todosN = new Group();
  todosCAC = new Group();
 
  overIMG = createSprite(windowWidth/2,windowHeight/2);
  restartIMG = createSprite(windowWidth/2,(windowHeight/2)+80);
  overIMG.addImage("Imagen_detallada_de_game_over_para_juego_de_trex_xd",OIMG);
  restartIMG.addImage("RIMG",RIMG);
  restartIMG.scale = 0.55;
 restartIMG.visible = false;
 overIMG.visible = false;

 trex.setCollider("circle",0,0,46)

 divisible = 3;
}

function draw() {

  //establecer color de fondo
  background(180);
  text("Puntuacion:"+score,10,10);
  text("Puntuacion Mas Alta:"+highScore,10,23);
  drawSprites();
if (game == "play"){
  console.log(trex.y)
  
  score = score + 1;
  



  //hacer que el trex salte al presionar la barra espaciadora
  if(keyDown("space")&& trex.y >= windowHeight-39) {
    trex.velocityY = -13;
   jumpSound.play();
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  
  if (score%100==0){
   checkpointSound.play();

  }

  //evitar que el trex caiga
  trex.collide(invisibleGround);
  
  //aparecer nubes
  spawnClouds();
  spawnCactuces();
  drawSprites();
  spawnGround();

  if (score > highScore){
    highScore = score
  }

  if (trex.isTouching(todosCAC)){
    game = "over";
    gameOverSound.play();
  }
}
if (game == "over"){
todosCAC.setVelocityXEach(0);
trex.velocityY = 0;
todosN.setVelocityXEach(0);
todosCAC.setLifetimeEach(-0.000000000000000000001);

todosN.setLifetimeEach(100000000000000000000.1);

restartIMG.visible = true;
overIMG.visible = true;

trex.changeAnimation("collided",trex_collided);
if(mousePressedOver(restartIMG)){
  trex.changeAnimation("collided",trex_collided);
  reinicio();
}
}
}

//función para aparecer las nubes
function spawnClouds(){


 // anti lag
 if(frameCount%20==0){
  clouds = createSprite(windowWidth,windowHeight,50,50);
  clouds.velocityX = -4;
  clouds.y = Math.round(random(20,windowHeight-100));
  console.log(clouds.y);
  clouds.addImage(image_clouds);
  clouds.scale = Math.random(1,2);
  clouds.lifetime = (windowWidth/clouds.velocityX)+10;
  trex.depth = clouds.depth + 1;
  todosN.add(clouds);
  overIMG.depth = clouds.depth + 1;
  restartIMG.depth = clouds.depth + 1;
 } 
}
 //función para aparecer las cactuces
function spawnCactuces(){
  // anti lag
  if(frameCount%90==0){
   
   cactus = createSprite(windowWidth,windowHeight-35,50,50);
   cactus.velocityX = -(6 + Math.round(score/450))
   CACn = Math.round(random(0,5));
   cactus.addImage(CAC[CACn])
   cactus.scale = 0.5;
   cactus.lifetime = (windowWidth/cactus.velocityX)+10;
   cactus.depth = cactus.depth + 2;
   todosCAC.add(cactus)
  }   
}

function spawnGround(){
  if(frameCount%200==0){
  ground = createSprite(windowWidth,windowHeight-20)
  ground.velocityX = -6
  ground.addImage("ground",groundImage)
  }
}

// función para reiniciar el juego :)
function reinicio(){
  todosCAC.setVelocityXEach(-4);
  todosN.setVelocityXEach(-4);
  restartIMG.visible = false;
  overIMG.visible = false;
  trex.changeAnimation("running",trex_running);
  game = "play";
  todosCAC.setLifetimeEach(0);
  todosN.setLifetimeEach(0);
  score = score - score;
}