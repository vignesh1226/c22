//creating global variables
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;
 
var engine;
var world;
var boxes = [];
 
var ground;
var gSlider;
 
 
function setup() {
    //creating canvas
    createCanvas(400, 400);
    //storing in variables
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);
    
    //creating a slider
    gSlider = createSlider(0, 100, 50);
    gSlider.position(40, 365);
    gSlider.input = map(engine.world.gravity, gSlider.min, gSlider.max, 0, 1);
    //creating a ground
    ground = new Ground(200,350,400,20);
    World.add(world, ground);
}
 
function mousePressed() {
    //with every mouse click a new box is created
    if (mouseY < 350) {
        boxes.push(new Box(mouseX, mouseY, random(10, 40), random(10, 40)));
    }
}
 
function draw() {
    //background
    background(51);
    
    //slider value
    var fVal = gSlider.value();
    
    //displaying slider
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].show();
    }

    //displaying ground
    ground.display();
    noStroke();
    fill(170);
    
    //displaying text
    fill(255);
    textSize(15);
    text("Gravity " + fVal, 180, 381);
}
 
function Box(x, y, w, h, options) {
    //constructing box
    var options = {
        friction: 0.5,
        restitution: 0.5,
    }
 
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);
 
    //show function
    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;
 
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(1);
        stroke(255);
        fill(127);
        rect(0, 0, this.w, this.h);
        pop();
    }
}
