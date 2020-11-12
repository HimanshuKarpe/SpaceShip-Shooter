
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var shooter,obstacles;
var bg_Image,backImage;
var asteroid_Image;
var shooter_Image;
var asteroid_grp;
var bullet_grp;
var score = 0;
var laser_Image

function preload()
{
	backImage=loadImage("SpaceAnimated.jpg")
	asteroid_Image=loadImage("Asteroid.png")
	shooter_Image=loadImage("SpaceshipShooter.png")
	laser_Image=loadImage("laserBullet.png")
}
function setup() {
	createCanvas(displayWidth, displayHeight);
	//background("red")

	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
	bg_Image=createSprite(displayWidth/2,displayHeight/2-50,displayWidth,displayHeight);
	//bg_Image.addImage(backImage);
	bg_Image.shapeColor= rgb(236,28,36);
	shooter=createSprite(300,600,30,30);
	shooter.addImage(shooter_Image);
	shooter.scale = 0.25
	
	bg_Image.velocityY=4
	Engine.run(engine);
	bullet_grp = createGroup();
	asteroid_grp= createGroup();
  
}


function draw() {
  rectMode(CENTER);
  background(rgb(236,28,36));
  
  //console.log(bg_Image.y);
  if(bg_Image.y>500){
	bg_Image.y=bg_Image.height/2;
}
   shooter.x=mouseX;

  spawnObstacles();
  Shooting();

   if(bullet_grp.collide(asteroid_grp)){
	   asteroid_grp.destroyEach();
	   bullet_grp.destroyEach();
	   score = score + 100;
   }  
  drawSprites();
  textSize(25); 
  text("score:"+score,1200,100);
   
}

function spawnObstacles(){
	if(frameCount % 70 === 0){
		var Asteroids = createSprite(500,0,50,50);
		Asteroids.addImage(asteroid_Image);
		Asteroids.scale=0.5;
		Asteroids.velocityY = 4

		Asteroids.x=Math.round(random(30,800));
        asteroid_grp.add(Asteroids);
	}
}

function Shooting(){
if(keyDown("space")){
	var bullet = createSprite(400,650,10,10);
	bullet.addImage(laser_Image);
	bullet.velocityY = -5;
	bullet.x=shooter.x;
	bullet_grp.add(bullet);
}
}



