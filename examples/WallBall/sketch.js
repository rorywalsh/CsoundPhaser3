
window.mobilecheck = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

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
    debugInfo = "mouseMoved: touches:" +touches.length;
    var force;
    background(51);  
    showWalls(); 
    ball.show(); 
    showEnemies();
    trajectoryPointPos = Vector.create(ball.body.position.x,ball.body.position.y);
    if(window.mobilecheck === true){
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

function touchPressed(){
    debugInfo = "touchPressed: touches:" +touches.length;
    pointerPressed();
}

//device agnostic method
function pointerPressed()
{
    debugInfo = "mousePressed: touches:" +touches.length;
    showPowerLevel = true;
    mouseDownPos = createVector(mouseX, mouseY);
    trajectoryPointPos = Vector.create(ball.body.position.x,ball.body.position.y);
    shouldDrawPath = 0;//shouldDrawPath == 1 ? 0 : shouldDrawPath+1;
    angle = 0;
    shotEnded = false;
}

// mouse/touch events
function mouseReleased()
{
    var force = Vector.normalise(Vector.create(mouseX-ball.body.position.x, mouseY-ball.body.position.y));
    body.applyForce(ball.body, ball.body.position, {x:force.x*ballSpeed*ballVelocity, y:force.y*ballSpeed*ballVelocity});
    pointerReleased();
}

function touchReleased()
{
    debugInfo =  "mouseReleased: touches:" +touches.length;
    var force = Vector.normalise(Vector.create(mouseX-ball.body.position.x, mouseY-ball.body.position.y));
    if(touches.length>1)
        body.applyForce(ball.body, ball.body.position, {x:force.x*ballSpeed*ballVelocity, y:force.y*ballSpeed*ballVelocity});
    pointerReleased();
}
//device agnostic method
function pointerReleased()
{
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
        ballVelocity = (sin(angle/100)+1)*.7;
        fill(0, 0, 0, 50);
        ellipse(mouseX, mouseY, ballVelocity*50);
        angle+=2;
    }
    fill(255);
    textSize(20);
    text(debugInfo, 100, 100);
}
