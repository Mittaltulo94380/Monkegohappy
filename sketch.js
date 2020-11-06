var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananasroup, obstacleGroup
var score
var ground
var SurvivalTime = 0

function preload(){
  
 //load animation 
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","  sprite_8.png");
  
  //load images
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
 }

function setup() {
  //create monkey
 monkey = createSprite(80,315,20,20);
 monkey.addAnimation("running",monkey_running); 
 monkey.scale = 0.1;
  
  //create ground
  ground = createSprite(200,350,900,10);
  ground.velocityX = -4; 
  ground.x = ground.width/2;
  
  //create obstacles and banana groups
  obstacleGroup = createGroup();
  bananasGroup = createGroup();
}


function draw() {
  //set background
 background("lightgreen");
  
  //jump when the space key is pressed
  if(keyDown("space") && monkey.y >= 100){
    monkey.velocityY = -10;
  }
  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
  //make the ground infinte
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  //collide monkey with ground
  monkey.collide(ground);
  
  //call fruits and obstacle functions
  fruit();
  obstacles();
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    bananasGroup.destroyEach();
    obstacleGroup.setVelocityXEach(0);
    bananasGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);
    
    var SurvivalTime = 0
    
  }
  
  
  
  //text score
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: ",+ score ,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  SurvivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: " + SurvivalTime, 100,50);
  
 drawSprites();  

   }


function fruit(){
  if(frameCount%80 === 0){
  banana = createSprite(400,Math.round(random(100,200)))
  banana.velocityX = -4;
  banana.scale = 0.1;
  banana.lifetime = 100;
    
  banana.depth = monkey.depth;  
  monkey.depth = monkey.depth+1;  
    
  //add image  
  banana.addImage(bananaImage);
    
  //add banana group  
  bananasGroup.add(banana);  
 }
  }

function obstacles(){
  //create stones 
  if(frameCount%300 === 0){
    obstacle = createSprite(400,326);
    obstacle.velocityX = -6;
    obstacle.scale = 0.1;
    obstacle.lifetime = 80;
    
    
    //add image
    obstacle.addImage(obstacleImage);
    
   //add obstacles group
   obstacleGroup.add(obstacle);
  }
   }
