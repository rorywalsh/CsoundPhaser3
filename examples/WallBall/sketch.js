
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);


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
    shotTaken = true,
    shotEnded = true,
    ballVelocity = 1,
    showPowerLevel = false,
    enemiesHit = 0,
    showLevelOverMessage = 0,
    level = 1,
    angle = 0,
    enemies = [],
    ball, dummyBall,
    walls = [],
    engine,
    world,
    trajectoryPointPos, 
    trajectoryPointVe,
    ballSpeed = 0.2,
    canvas,
    firstTouch = 0,
    ballRadius,
    mouseDownPos,
    debugInfo;

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
    canvas = createCanvas(windowWidth, windowHeight);
    mouseDownPos = createVector(0, 0);
    ballRadius = windowWidth*.01;
    ballVelocity = .001;
    debugInfo = "";
    playAreaHeight = windowHeight;
    playAreaWidth = windowWidth;
    Matter.Resolver._restingThresh = 0.1;
    ballSpeed = windowWidth*.00005;
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

    ball = new Ball(random(playAreaWidth*.2, playAreaWidth*.8), random(playAreaHeight*.2, playAreaHeight*.8), ballRadius);

    for ( var i = 0 ; i < level ; i++){
        enemies.push(new Enemy(random(playAreaWidth*.3, playAreaWidth*.7), random(playAreaHeight*.3, playAreaHeight*.7), ballRadius));
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
    debugInfo = "mouseMoved: touches:";
    var force;
    background(51);  
    showWalls(); 
    ball.show(); 
    showEnemies();
    trajectoryPointPos = Vector.create(ball.body.position.x,ball.body.position.y);
    if(isMobile == true){
        force = Vector.normalise(Vector.create(mouseX-mouseDownPos.x, mouseY-mouseDownPos.y));
    }
    else
        force = Vector.normalise(Vector.create(mouseX-ball.body.position.x, mouseY-ball.body.position.y));
    
    trajectoryPointVel = Vector.create(force.x, force.y);
    pathFadeOutValue = 255; 
    shouldDrawPath = 1; 
}

//mouse/touch pressed events
function mousePressed() {
    pointerPressed();
}

function touchStarted(){
    debugInfo = "touchPressed: touches:";
    pointerPressed();
}

//device agnostic method
function pointerPressed()
{
    debugInfo = "mousePressed: touches:";
    if(touches.length==2)
        showPowerLevel = true;
    
    if(isMobile === false)
        showPowerLevel = true;
    
    if(touches.length==1)
        mouseDownPos = createVector(mouseX, mouseY);
    
    trajectoryPointPos = Vector.create(ball.body.position.x,ball.body.position.y);
    // shouldDrawPath = 0;//shouldDrawPath == 1 ? 0 : shouldDrawPath+1;
    angle = 0;
    //shotEnded = false;
}

// mouse/touch events
function mouseReleased()
{
    var force = Vector.normalise(Vector.create(mouseX-ball.body.position.x, mouseY-ball.body.position.y));
    body.applyForce(ball.body, ball.body.position, {x:force.x*ballSpeed*ballVelocity, y:force.y*ballSpeed*ballVelocity});
    pointerReleased();
}

function touchEnded()
{
    debugInfo =  "mouseReleased: touches:";
    var force = Vector.normalise(Vector.create(mouseX-ball.body.position.x, mouseY-ball.body.position.y));
    if(touches.length == 1){
        //trajectoryPointVel.normalise();
        body.applyForce(ball.body, ball.body.position, {x:trajectoryPointVel.x*ballSpeed*ballVelocity, y:trajectoryPointVel.y*ballSpeed*ballVelocity});
    }
    else if(touches.length == 0)
        showPowerLevel = false;

    pointerReleased();
}
//device agnostic method
function pointerReleased()
{
    shouldDrawPath = 0;
    shotTaken = true;
    // showPowerLevel = false;
}

function restartLevel()
{
    enemies.length = 0;
    walls.length = 0;
    setup();
}


function draw() {
    Engine.update(engine);

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

    fill(255);
    textSize(20);
    text(debugInfo+" "+touches.length, 100, 100);

    if(isMobile == true)
        text("Mobile11", 100, 200);
    else
        text("not Mobile", 100, 200);

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

    if(showPowerLevel){
        ballVelocity = (sin(angle/100)+1)*(isMobile ? .3 : .7);
        fill(0, 0, 0, 50);
        ellipse(mouseX, mouseY, ballVelocity*(isMobile ? 100 : 50));
        angle+=2;
    }


}
