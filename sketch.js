
var monkey , monkey_running,monkeyStop;
var bananaImage, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var gameState='play';
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkeyStop=loadAnimation("sprite_7.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(600,400);
  
  monkey= createSprite(50,363,20,20);
  monkey.addAnimation('running',monkey_running);
  monkey.addAnimation('stop',monkeyStop);
  monkey.scale=0.1;
  
  ground = createSprite(300,400,600,10);
  ground.velocityX=-2;
  ground.x=ground.width/2;
  ground.visible=false;
  FoodGroup=new Group();
  obstacleGroup=new Group();
  
  score=0;
}


function draw() {
background('lightpink');
  
 
  if(ground.x<600){
    ground.x=ground.width/2;
  }
  if(keyDown('space')){
    monkey.velocityY=-8;
  }
  monkey.velocityY=monkey.velocityY+1;
  
  monkey.collide(ground);
  
  spawnFood();
  spawnStones();
  
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score=score+2;
  }
  switch(score){
    case 10: monkey.scale=0.12;
      break;
    case 20: monkey.scale=0.14;
      break;
    case 30: monkey.scale=0.16;
      break;
    case 40: monkey.scale=0.18;
      break;
      default: break;
  }
     
 if(obstacleGroup.isTouching(monkey)) {
     ground.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
      monkey.changeAnimation('stop',monkeyStop);
       
  }
  drawSprites();
  textSize(24);
  stroke("red");
  fill('red');
  text('Score:'+score,272,50);
}

function spawnFood(){
  if(frameCount%180===0){
    var food = createSprite(800,random(120,200));
    food.addImage(bananaImage);
    food.velocityX=-3;
    food.scale=0.1;
    monkey.depth=food.depth+1;
    food.lifetime=300;
    FoodGroup.add(food);
  }
  
}


function spawnStones(){
  if(frameCount%300===0){
    var stone = createSprite(800,380);
    stone.addImage(obstacleImage);
    stone.velocityX=-2;
    stone.scale=0.2  ;
    stone.lifetime=400;
    obstacleGroup.add(stone);
    
  }
  
}


