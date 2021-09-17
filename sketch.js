var cup;
var cupImg,bg,bgImg;
var dropImg; 
var rainG;
var gameState=0;
var gameOver,gameOverImg;
var restart,restartImg;
var score=0;
var edges;
var left;
var right;
var dSound;
var bottom;
var ls,lsImg;
var lsSound;

function preload(){
  cupImg=loadImage("images/cup.png");
  bgImg=loadImage("images/bg.jpg");
  dropImg=loadImage("images/drop.png");
  gameOverImg=loadImage("images/gameOver.jpg");
  restartImg=loadImage("images/restart.png");
  dSound=loadSound("images/Dsound.mp3");
  lsImg=loadImage("images/ls.png");
  laSound=loadSound("images/lsSound.wav");

}

function setup() {
  createCanvas(windowWidth,windowHeight);
   //bg=createSprite(500,400,1000,800);
  //bg.addImage(bgImg); 

left=createSprite( 0,windowHeight/2,10,windowHeight);
right=createSprite(windowWidth -10,windowHeight/2,10,windowHeight);
bottom=createSprite(500,790,1000,10);
bottom.visible=false;
ls=createSprite(500,400,50,50);
ls.scale=1.5;
ls.addImage(lsImg);


  cup=createSprite(400, 750, 50, 50);
  cup.addImage(cupImg);
  cup.scale=0.2;
  rainG=new Group();
  
  gameOver=createSprite(windowWidth/2);
  gameOver.addImage(gameOverImg);
  gameOver.scale=1.0;
  gameOver.visible=false;

  edges=createEdgeSprites();
  cup.bounceOff(edges);

  restart=createSprite(500,600,50,50);
  restart.addImage(restartImg);
  restart.scale=0.3;
  restart.visible=false;

  }
function draw() {
  background("#a0ee45");
  
    if(keyDown("right")){
    cup.x+=15;
  }
  if(keyDown("left")){
    cup.x=cup.x-15;
  }
 cup.bounceOff(left);
 cup.bounceOff(right);

  
if(gameState===0){
  

  if(keyDown("space")){
   
   ls.visible=false;
    gameState=1;

  }

}

else

  if(gameState===1){
    rain();
    score=score+ Math.round(frameRate()/60);
    
    if(rainG.isTouching(bottom)){
      
    }
    if(rainG.isTouching (cup)){
      gameState=2
      

    }

  }
  else if(gameState===2){
        rainG.destroyEach();
        gameOver.visible=true;
        restart.visible=true;
        if(mousePressedOver(restart)){
          reset();
        }

  }
  
  drawSprites();
  textSize(25);
  text("Score: "+score,50,50);

  }

  function rain(){
    if(frameCount %8===0){
      drop=createSprite(random(10,990),0,10,10);
      drop.addImage(dropImg);
      drop.velocityY=20;
      drop.scale=0.1

      rainG.add(drop);

    }
  
  }
  
function reset(){
  gameState=0;
  gameOver.visible=false;
  restart.visible=false;
  ls.visible=true;
  score=0;
}