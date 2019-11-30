function Ball(x, y, r) {
  var options = {
    friction: 0.0,
    restitution: 1,
    frictionStatic: 0
  }
  this.type = 'ball'; 
  this.body = Bodies.circle(x, y, r, options);
  this.r = r;
  this.colour = color(127, 0, 127, 255);
  this.strokeThickness = 1;
  World.add(world, this.body);

  this.setVisible = function(visible){
    this.colour = (visible == true ? color(127, 127, 127, 127) : color(127, 127, 127, 0));
    this.strokeThickness = (visible == true ? 1 : 0);
  }

  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rectMode(CENTER);
    strokeWeight(this.strokeThickness);
    stroke(255);
    fill(this.colour);
    ellipse(0, 0, this.r*2);
    pop();
  }
}
