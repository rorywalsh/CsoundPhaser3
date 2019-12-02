// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/urR596FsU68

// module aliases
var Engine = Matter.Engine,
    Vector = Matter.Vector,
    World = Matter.World,
    body = Matter.Body,
    Bodies = Matter.Bodies,
    shouldDrawPath = 0,
    pathFadeOutValue = 255,
    trajectoryPoints = new Array(100),
    wallHits = [1, 1, 1, 1],
    enemyHits = [0],
    shotTaken = false,
    shotEnded = true,
    ballVelocity = 1,
    showPowerLevel = false,
    enemiesHit = 0,
    showLevelOverMessage = 0,
    level = 1,
    angle = 0,
    enemies = [],
    ball, dummyBall;
    walls = [],
    engine,
    world,
    trajectoryPointPos, 
    trajectoryPointVe,
    ballSpeed = 0.2,
    canvas,
    firstTouch = 0;

    // function touchStarted () {
    //     var fs = fullscreen();
    //     if (!fs) {
    //       fullscreen(true);
    //     }
    //   }
    // /* full screening will change the size of the canvas */
    // function windowResized() {
    // resizeCanvas(playAreaWidth, playAreaHeight);
    // }
  
    function windowResized() {
        resizeCanvas(playAreaWidth, playAreaHeight);
    }
  /* prevents the mobile browser from processing some default
   * touch events, like swiping left for "back" or scrolling
   * the page.
   */
    document.ontouchmove = function(event) {
      event.preventDefault();
    };

function setup() {
    canvas = createCanvas(displayWidth, displayHeight);
    playAreaHeight = displayHeight;
    playAreaWidth = displayWidth;
    Matter.Resolver._restingThresh = 0.1;
    ballSpeed = 0.15;
    canvas.style("overscroll-behavior-y", "contain");
    engine = Engine.create();
    engine.world.gravity.y = 0;
    world = engine.world;
    Engine.run(engine);
    var options = {
        isStatic: true
    }

    for( var i = 0 ; i < level ; i++)
        enemyHits.push(0);
    //collisions
    Matter.Events.on(engine, 'collisionStart', function(event){
        let pairs = event.pairs;
        pairs.forEach(function(pair){
            enemies.forEach(function(enemy){
                if(enemy.body == pair.bodyA || enemy.body == pair.bodyB){
                    var index = parseInt(enemy.body.label.substring(5, 10));
                    enemies[index].colour = color(random(0, 255), random(0, 255), random(0, 255));
                    enemiesHit++;
                    enemyHits[index] = 1;;
                }
            });

            walls.forEach(function(wall){
                if(wall.body == pair.bodyA || wall.body == pair.bodyB){
                    var index = parseInt(wall.body.label.substring(4, 10));
                    wallHits[index] -=1;
                    translate(random(-5,5),random(-5,5));
                }
            });

            console.log(wallHits);
        })
    });
        
        // check bodies, do whatever...

    walls.push(new Wall(playAreaWidth/2, 0, playAreaWidth, playAreaHeight*.1));       //top
    walls[0].body.label = "Wall0";
    walls.push(new Wall(playAreaWidth/2, playAreaHeight, playAreaWidth, playAreaHeight*.1));  //bottom
    walls[1].body.label = "Wall1"
    walls.push(new Wall(0, playAreaHeight/2, playAreaWidth*.1, playAreaHeight));      //left
    walls[2].body.label = "Wall2"
    walls.push(new Wall(playAreaWidth, playAreaHeight/2, playAreaWidth*.1, playAreaHeight));  //right
    walls[3].body.label = "Wall3";

    ball = new Ball(random(playAreaWidth*.2, playAreaWidth*.8), random(playAreaHeight*.2, playAreaHeight*.8), 20);

    for ( var i = 0 ; i < level ; i++){
        enemies.push(new Enemy(random(playAreaWidth*.3, playAreaWidth*.7), random(playAreaHeight*.3, playAreaHeight*.7), 20));
        enemies[i].body.label = "Enemy"+i;
    }

    trajectoryPointPos = Vector.create(ball.body.position.x,ball.body.position.y);
    trajectoryPointVel = Vector.create(.1,.1);
}


function showWalls()
{
    for(elem of walls)
          elem.show();
}

// function touchStarted () {
//     var fs = fullscreen();
//     if (!fs) {
//       fullscreen(true);
//     }
//   }

function showEnemies()
{
    for(elem of enemies)
          elem.show();
}

// mouse/touch moved events
function mouseMoved()
{
   pointerMoved();
}

function touchMoved()
{
   pointerMoved();
}

//device agnostic method
function pointerMoved()
{
    background(51);  
    showWalls(); 
    ball.show(); 
    showEnemies();
    trajectoryPointPos = Vector.create(ball.body.position.x,ball.body.position.y);
    var force = Vector.normalise(Vector.create(mouseX-ball.body.position.x, mouseY-ball.body.position.y));
    trajectoryPointVel = Vector.create(force.x, force.y);
    pathFadeOutValue = 255; 
    shouldDrawPath = 1; 
}

//mouse/touch pressed events
function mousePressed() {
    pointerPressed();
}

function touchPressed()
{
    if(firstTouch==1) 
        pointerPressed();
    
    firstTouch = 1;

}

//device agnostic method
function pointerPressed()
{
    showPowerLevel = true;
    trajectoryPointPos = Vector.create(ball.body.position.x,ball.body.position.y);
    shouldDrawPath = 0;//shouldDrawPath == 1 ? 0 : shouldDrawPath+1;
    angle = 0;
    shotEnded = false;
}

// mouse/touch events
function mouseReleased()
{
    pointerReleased();
}

function touchReleased()
{
    pointerReleased();
}
//device agnostic method
function pointerReleased()
{
    var force = Vector.normalise(Vector.create(mouseX-ball.body.position.x, mouseY-ball.body.position.y));
    body.applyForce(ball.body, ball.body.position, {x:force.x*ballSpeed*ballVelocity, y:force.y*ballSpeed*ballVelocity});
    shouldDrawPath = 0;
    shotTaken = true;
    showPowerLevel = false;
}

function restartLevel()
{
    enemies.length = 0;
    walls.length = 0;
    setup();
}


function draw() {
    Engine.update(engine);
    // for(elem of walls)
    // {
    //     var collide = Matter.Detector(ball.body, elem.body);

    //     if (collide){
    //         console.log(ball.body.position);
    //     }
    // }

    if(shouldDrawPath==1 && shotEnded){
        noStroke();
        fill(255, 255, 255, pathFadeOutValue);
        //show trajectory of proposed shot
        var force = Vector.normalise(Vector.create(mouseX-ball.body.position.x, mouseY-ball.body.position.y));
        
        if(pathFadeOutValue>0){
            ellipse(trajectoryPointPos.x, trajectoryPointPos.y, 5);
            trajectoryPointPos.x+=trajectoryPointVel.x*20;
            trajectoryPointPos.y+=trajectoryPointVel.y*20;

            if(trajectoryPointPos.y < walls[0].body.position.y+80 || trajectoryPointPos.y > walls[1].body.position.y-80){
                trajectoryPointVel.y*=-1;
            }
            if(trajectoryPointPos.x < walls[2].body.position.x+80 || trajectoryPointPos.x > walls[3].body.position.x-80)
                trajectoryPointVel.x*=-1;  
        }
        pathFadeOutValue-=playAreaWidth*0.001;;
        // if(pathFadeOutValue<0)
        // shouldDrawPath = 0;
    }
    else
    {
        background(51);    
        stroke(255);
        // line(ball.body.position.x, ball.body.position.y, mouseX, mouseY)      
        ball.show();
        showWalls();
        showEnemies();
    }

    if(ball.body.speed<.05 && shotTaken == true)
    {
        shotEnded = true;
        var sum = wallHits.reduce((a,b) => a + b, 0);
        var enemiesSum = enemyHits.reduce((a,b) => a + b, 0);
        if(enemiesHit>0)
        {
            // showLevelOverMessage = true;
            wallHits = [1,1,1,1];
            enemiesHit = 0;


        }
        else if(sum < 0){
            level++;
            restartLevel();
        }
        shotTaken = false;
    }

    // if(showLevelOverMessage){
    //     textSize(width / 10);
    //     textAlign(CENTER, CENTER);
    //     fill(0, 255, 0);
    //     text("Whoops...", width/2, height/2);
    // }
    if(showPowerLevel){
        // fill(255, 0, 0);
        // rect(770, 50, 10, 500, 10);
        // fill(0, 0, 0);
        // rect(770, 50, 10, (sin(angle/100)*250+250), 10);
        ballVelocity = (sin(angle/100)+1)/2;
        fill(0);
        ellipse(mouseX, mouseY, ballVelocity*50);
        angle+=2;
    }
}
