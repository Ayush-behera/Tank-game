var tank, airplane, airplane_group;
var gamestate;
var background_image, tank_image, airplane_image;
var borderline;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score=0;
var gameOver, restart;
var blast_animation;
var bullet, bullet_image;


function preload() {
  background_image=loadImage("space_image.jpg")
  tank_image=loadImage("tank_sprite-removebg-preview.png")
  airplane_image=loadImage("a1.png")
  airplane_image2=loadImage("a2.png")
  airplane_image3=loadImage("a3.png")
  airplane_image4=loadImage("a4.png")
  airplane_image5=loadImage("a5.png")  
  airplane_image6=loadImage("a6.png")
  blast_animation=loadAnimation("explosion_image-removebg-preview.png")
  bullet_image=loadImage("bs.png")
  gameOver=loadImage("gameover.png")
}

function setup() {
  createCanvas(1270,600);
  tank=createSprite(625,550, 45, 45);
  tank.addImage(tank_image)
  tank.scale=0.4
  borderline=createSprite(625,475,1300,10);
  borderline.shapeColor="red";
  airplane_group=createGroup();
  tank.addAnimation("animation",blast_animation);
  game_over=createSprite(625,275,100,100)
  game_over.addImage(gameOver)
  game_over.scale=0.9
  bulletGroup = new Group();

  

  
  

}


function draw() {
  background(background_image); 
  text(mouseX+","+mouseY,mouseX,mouseY)
  console.log(frameCount)
  tank.x = World.mouseX
  if (gameState===PLAY){
    spawnAirplane();
    game_over.visible=false
    
    if (keyDown("space")) {
      createBullet();
  
    }
    if(airplane_group.isTouching(borderline)){
      gameState = END;
  }
  if (bulletGroup.isTouching(airplane_group)) {
    airplane_group.setLifetimeEach(0)
    score = score + Math.round(random(1,10));
  }
  }
  else if (gameState === END) {
    game_over.visible=true
    tank.scale=0.13
    
    //set velcity of each game object to 0
    airplane_group.setLifetimeEach(0);
    airplane_group.setVelocityYEach(0);
    airplane_group.setVelocityXEach(0);
    bulletGroup.setLifetimeEach(0)
    
    tank.changeAnimation("animation",blast_animation);
    
  }
  
    
    //change the tank animation
    
    
    //set lifetime of the game objects so that they are never destroyed
  textSize(35)
  fill ("red")
    text("Score: " + score, 1080, 30);
  
  drawSprites();
}

function spawnAirplane() {
  if(frameCount % 60 === 0) {
    var airplane = createSprite(640,80,40,40);
    //obstacle.debug = true;
    airplane.velocityY = +7;
    airplane.x = Math.round(random(1200,550));
    //generate random obstacles
    var rand = Math.round(random(1,6));
    
    switch(rand) {
      case 1: airplane.addImage(airplane_image2);
              break;
      case 2: airplane.addImage(airplane_image3);
              break;
      case 3: airplane.addImage(airplane_image4);
              break;
      case 4: airplane.addImage(airplane_image5);
              break;
      case 5: airplane.addImage(airplane_image6);
              break;
      case 6: airplane.addImage(airplane_image);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    airplane.scale = 0.3;
    airplane.lifetime = 500;
    //add each obstacle to the group
    airplane_group.add(airplane);
  }
}
function createBullet() {
  if(frameCount % 5 === 0) {
  var bullet = createSprite(tank.x, tank.y , 60, 10);
  bullet.addImage(bullet_image);
  bullet.velocityY = -15;
  bullet.lifetime = 150;
  bullet.scale = 0.1;
  bulletGroup.add(bullet);
  }
}