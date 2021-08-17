/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var kangaroo, kangaroo_running, kangaroo_collided;
var jungle, invisiblejungle;

var sGroup,stones; 

var score = 0;

var gameOver, restart;

var selectBush,bush;

function preload(){
  kangaroo_running =   loadAnimation("assets/kangaroo1.png","assets/kangaroo2.png","assets/kangaroo3.png");
  kangaroo_collided = loadAnimation("assets/kangaroo1.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  stones = loadImage("assets/stone.png");
 // gameOverImg = loadImage("assets/gameOver.png");
 // restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
}

function setup() {
  createCanvas(800, 400);

  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.4
  jungle.x = width /2;

  shrubsGroup = new Group();
  sGroup = new Group();
  
  kangaroo = createSprite(150,320,20,40)
  kangaroo.addAnimation("run",kangaroo_running )
  kangaroo.scale = 0.2
  kangaroo.setCollider("rectangle",0,0,800,1000);
  kangaroo.addAnimation("colliding" ,kangaroo_collided )


 score = 0;

  ground = createSprite(400,390,850,20)
 ground.visible = false
 
 


}





function draw() {
  background(255);
  
  
kangaroo.x = camera.position.x - 270


if(gameState === PLAY){
  sapwnBushes();
  spawnRocks();


  jungle.velocityX = -10

  if(jungle.x <10){
  jungle.x = width/2
  }

  if (keyDown("space") && kangaroo.y >= 200) {
   jumpSound.play();
    kangaroo.velocityY = -9; }

 kangaroo.velocityY =kangaroo.velocityY + 0.3;
 kangaroo.collide(ground)


 if(kangaroo.isTouching(shrubsGroup)){
   score = score+ 1
   shrubsGroup.destroyEach();
 }

 if(kangaroo.isTouching(sGroup)){
   gameState = END;


  collidedSound.play();
 }

 if(gameState === END){

  jungle.velocityX = 0
  shrubsGroup.destroyEach();
  kangaroo.velocityY =0

  sGroup.setVelocityXEach(0)
  sGroup.setLifetimeEach(-1)

 kangaroo.changeAnimation("colliding",kangaroo_collided)

  lost = createImg ("assets/restart.png")
  lost.position(400,200);
  lost.size (100,100)

  gamelost = createImg ("assets/gameOver.png")
  gamelost.position(300,100);
  gamelost.size (400,100)
}

}


  drawSprites();

  fill("blue")
  textSize (20)
  text ("Score :  " + score,700,100)


}





function sapwnBushes(){
  if(frameCount % 150 === 0){

   bushSelect = Math.round(random (1,3))

 
  bush  = createSprite (camera.position.x + 500, 360, 40, 10)
  bush.velocityX = -5

  bush.addImage("1", shrub1)
  bush.addImage("2", shrub2)
  bush.addImage("3", shrub3)
bush.scale = 0.07
 
     if(bushSelect === 2){
      bush.changeImage("2", shrub2)
       }
  
       if(bushSelect === 3){
        bush.changeImage("3", shrub3)
         }
         shrubsGroup.add(bush)

  
 shrubsGroup.setLifetimeEach(180)
        }
}



  function spawnRocks(){
    if( frameCount % 200 === 0){
      rock = createSprite(camera.position.x + 500, 360, 40, 10)
      rock.velocityX = -5
      rock.addImage("stone", stones)
      rock.scale =0.2
    
      sGroup.add(rock)
      sGroup.setLifetimeEach(180)
    }
  }








