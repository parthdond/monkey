//global variable 
var back,groundimg;
var invisibleline;
var monkey , monkey_running,monkeystopimg,monkeystop;
var obstacle, obstacleimg;
var fruitGroup, obstacleGroup;
var banana ,bananaimg;
var score;
var gameover,overimg
var restart,restartimg;
var jumpsound;
var survivaltime=0;



//gamestate
PLAY=1;
END=0;
gameState=PLAY;


function preload(){
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  
  groundimg= loadImage("ground.jpg");
  
  monkeystopimg = loadImage("sprite_1.png");
  
  obstacleimg= loadImage("obstacle.png");
   
  bananaimg = loadImage("banana.png");

  overimg = loadImage("over.png");
  
  restartimg = loadImage("restart.png");
  
  jumpsound = loadSound("mixkit-explainer-video-game-alert-sweep-236.wav");
  
 
}

function setup() {
   createCanvas(500,270);
  
     score=0;
    suvivaltime=0;
    
  
     back = createSprite(200,130,400,270);
     back.addImage("g",groundimg);
   
     monkey=createSprite(80,230,20,20);
     monkey.addAnimation("moving",monkey_running);
     monkey.addAnimation("stop",monkeystopimg);

   //monkey.debug=true; 
     monkey.setCollider("rectangle",0,0,300,550,60)
     monkey.scale = 0.1;
  
     invisibleline=createSprite(80,230,400,1);
     invisibleline.visible=false;
 
     gameover = createSprite(250,150,1,0);  
     gameover.addImage("over",overimg);
     gameover.scale=0.2;
     gameover.visible=false;
  
     restart = createSprite(250,50,1,1);
     restart.addImage("start",restartimg);
     restart.scale=0.5;
     restart.visible=false;

  
  // score variables and groups
  
  obstacleGroup = new Group();
  
  fruitGroup = new Group();

    
}
function draw() {
  background("lightblue");
   
    

  if(gameState===PLAY){
      back.velocityX = -(5 +score/5)
   
 survivaltime=survivaltime+Math.round(getFrameRate()/60)
    
  //jump command
  
     if(keyDown("space")&& monkey.y>=180) {
        jumpsound.play();
        monkey.velocityY = -12  ;
     }
    
    // increasing score when monkey is touching banana
   
    if( monkey.isTouching(fruitGroup)){
       score=score+1;
       fruitGroup.destroyEach();
      } 
    
     if(monkey.isTouching(obstacleGroup)){
      gameState=END;

    }  
  
    //calling function

    
     spawnObstacle();
     spawnbanana();
    
    //gravity
  
       monkey.velocityY=monkey.velocityY+0.7;  
  
    
  //stoping monkey from falling down
       monkey.collide(invisibleline);
  
  
  
  //moving the background
  
    if(back.x<0){
       back.x=back.width/2;  
     
      
    }
    
  }
  
  
    if(gameState===END){
       gameover.visible=true;
       restart.visible=true;
       obstacleGroup.destroyEach();
       fruitGroup.destroyEach();
       back.velocityX=0 ;
       monkey.collide(invisibleline);
       fruitGroup.velocityX=0;
       obstacleGroup.velocityX=0;
       monkey.changeAnimation("stop",monkeystopimg);
      
    }
  
  
 if(mousePressedOver(restart)&&gameState===END){
   reset();
       
 }
  
     
  
 drawSprites();

    stroke("white");
    textSize(20);
    text("score:"+score,400,30)
  
    stroke("white");
    textSize(20);
    text("survivaltime:"+survivaltime,20,30)
}
 
function  reset (){
   gameState=PLAY;
   restart.visible=false;
   gameover.visible=false;
   score=0;
   obstacleGroup.destroyEach();
   fruitGroup.destroyEach();
   survivaltime=0;
   back.velocityX=-5;
  monkey.changeAnimation("moving",monkey_running);


}

function spawnObstacle(){
  
        
  var rand=Math.round(random(1,1));
  
  if(frameCount%300===0){
   var obstacle=createSprite(500,200,20,20);
    
    obstacle.addImage("rock",obstacleimg);
    
    obstacle.scale=0.2;
    
    obstacle.y=200;
    
    obstacle.velocityX=-(5+score/5); 
  
    obstacle.Lifetime=150;
    
   // obstacle.debug=true;
    
    obstacle.setCollider("circle",0,0,200)
    
    obstacleGroup.add(obstacle);
}
    
    
}

function spawnbanana(){
  
   
      
  var randm=Math.round(random(1,1));
  if(frameCount%80===0){
     banana=createSprite(500,50,20,20);

    banana.addImage("fruit",bananaimg) ;
    
    banana.scale=0.1;
  
    banana.y=Math.round (random(50,140));
  
    banana.velocityX=-(5+score/5); 
  
    banana.lifetime=150;
    
//  banana.debug=true;
    
    banana.setCollider("rectangle",0,0,400,200)
    
    fruitGroup.add(banana); 
  }

    
    
}

