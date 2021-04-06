const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var knight, knightRunning, knightIdle;
var Monster, MonsterImg;
var bg;
var health = 100, lastItem = "None", damage = 0;
var isRunning = false;
var item = 0;
var engine, world;
var ironSword, masterSword, thorn, poison;
var ironSwordPicked = false;
var masterSwordPicked = false;
var itemInHand = "None";
var monsterHealth = 100;

function preload(){
    knightRunning = loadAnimation("Caracter/1.png","Caracter/2.png","Caracter/3.png","Caracter/4.png",
    "Caracter/5.png","Caracter/6.png","Caracter/7.png","Caracter/8.png","Caracter/9.png",
    "Caracter/10.png","Caracter/11.png","Caracter/12.png","Caracter/13.png","Caracter/14.png",
    "Caracter/15.png","Caracter/16.png","Caracter/17.png","Caracter/18.png","Caracter/19.png",
    "Caracter/20.png");
    knightIdle = loadAnimation("Caracter/1.png");
    MonsterImg = loadImage("Boss Monster.png");
    bg = loadImage("Background.jpg");
    ironSwordImg = loadImage("Iron Sword.png");
    masterSwordImg = loadImage("Master Sword.png");
    thornImg = loadImage("Thorn.png");
    poisonImg = loadImage("Poison.png");
}

function setup(){
    canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;
    knight = createSprite(50,200,30,30);
    knight.addAnimation("running",knightRunning);
    knight.addAnimation("idle",knightIdle);
    knight.setCollider("rectangle",-3,3,40,50);

    Monster = createSprite(1100,200,40,40);
    Monster.addImage(MonsterImg);
    Monster.scale = 0.8;

    box1 = new Box(125,200,45,45);
    box2 = new Box(300,200,45,45);
    box3 = new Box(475,200,45,45);
    box4 = new Box(650,200,45,45);
    box5 = new Box(825,200,45,45);
    invisibleBox1 = createSprite(125,200,25,40);
    invisibleBox1.visible = false;
    invisibleBox1.setCollider("rectangle",0,0,40,40);
    invisibleBox1.debug = true;
    invisibleBox2 = createSprite(300,200,25,40);
    invisibleBox2.setCollider("rectangle",0,0,40,40);
    invisibleBox2.visible = false;
    invisibleBox3 = createSprite(475,200,25,40);
    invisibleBox3.setCollider("rectangle",0,0,40,40);
    invisibleBox3.visible = false;
    invisibleBox4 = createSprite(650,200,25,40);
    invisibleBox4.setCollider("rectangle",0,0,40,40);
    invisibleBox4.visible = false;
    invisibleBox5 = createSprite(825,200,25,40);
    invisibleBox5.setCollider("rectangle",0,0,40,40);
    invisibleBox5.visible = false;
    
}

function draw(){
    background(bg);
    Engine.update(engine);
    textSize(30);
    fill("red");
    text("Health: " + health,10,50);
    text("Monster health: " + monsterHealth,900,50);
    textSize(20);
    fill(255);
    text("Last Item: " + lastItem,10,90 );
    text("Item in hand: " + itemInHand,950,90);
    
    isMoving();
    if(!isRunning){
        knight.changeAnimation("idle",knightIdle);
    }
    if(isRunning){
        knight.changeAnimation("running",knightRunning);
    }

    if(keyIsDown(UP_ARROW)){
        knight.y = knight.y-2;
    }
    if(keyIsDown(DOWN_ARROW)){
        knight.y = knight.y+2;
    }
    if(keyIsDown(RIGHT_ARROW)){
        knight.x = knight.x+2;
    }
    if(keyIsDown(LEFT_ARROW)){
        knight.x = knight.x-2;
    }

    if(knight.isTouching(invisibleBox1)){
        items(invisibleBox1);
        invisibleBox1.destroy();
        Matter.Body.setPosition(box1.body , {x:-100,y:0});
    }
    if(knight.isTouching(invisibleBox2)){
        items(invisibleBox2);
        invisibleBox2.destroy();
        Matter.Body.setPosition(box2.body , {x:-100,y:0});
    }
    if(knight.isTouching(invisibleBox3)){
        items(invisibleBox3);
        invisibleBox3.destroy();
        Matter.Body.setPosition(box3.body , {x:-100,y:0});
    }
    if(knight.isTouching(invisibleBox4)){
        items(invisibleBox4);
        invisibleBox4.destroy();
        Matter.Body.setPosition(box4.body , {x:-100,y:0});
    }
    if(knight.isTouching(invisibleBox5)){
        items(invisibleBox5);
        invisibleBox5.destroy();
        Matter.Body.setPosition(box5.body , {x:-100,y:0});
    }
    if(ironSwordPicked){
        itemInHand = "Iron Sword";
    }
    if(masterSwordPicked){
        itemInHand = "Master Sword";
    }

    box1.display();
    box2.display();
    box3.display();
    box4.display();
    box5.display();

    drawSprites();
}

function isMoving(){
    if(keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW) || keyIsDown(RIGHT_ARROW) || keyIsDown(LEFT_ARROW)){
        isRunning = true;
    }
    else{
        isRunning = false;
    }
}

function items(box){
    item = Math.round(random(1,4));
    console.log(item);
    if(item === 1){
        ironSword = createSprite(-10,-10,10,10);
        var x = box.x;
        var y = box.y;
        ironSword.x = box.x;
        ironSword.y = box.y;
        ironSword.addImage(ironSwordImg);
        ironSword.scale = 0.02;
        lastItem = "Iron Sword";
        ironSwordPicked = true;
    }
    if(item === 2){
        masterSword = createSprite(-10,-10,10,10);
        var x = box.x;
        var y = box.y;
        masterSword.x = box.x;
        masterSword.y = box.y;
        masterSword.addImage(masterSwordImg);
        masterSword.scale = 0.04;
        lastItem = "Master Sword";
        masterSwordPicked = true;
    }
    if(item === 3){
        thorn = createSprite(-10,-10,10,10);
        thorn.x = box.x;
        thorn.y = box.y;
        thorn.addImage(thornImg);
        thorn.scale = 0.05;
        damage = 10;
        health = health - damage;
        lastItem = "Thorn";
    }
    if(item === 4){
        poison = createSprite(-10,-10,10,10);
        poison.x = box.x;
        poison.y = box.y;
        poison.addImage(poisonImg);
        poison.scale = 0.02;
        damage = 25;
        health = health - damage;
        lastItem = "Poison";
    }
}