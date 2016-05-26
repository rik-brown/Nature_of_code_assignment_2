function Cell (x, y) {
  // Constructor for cell object
  this.position = createVector (x, y); // Cell starts at random position
  this.velocity = createVector (0, 0); // Initial velocity is 0
  this.radius = random(20,100); // maximum difference is 100-20 = 80
  this.mass = this.radius/2;
  //this.color = color(random(360), random(50,100), random(50,100));
  this.color = color(random(360));
  this.G = 1;
  
  this.calculateForce = function(other) {
    var force = p5.Vector.sub(other.position, this.position);
    var distance = force.mag();
    distance = constrain(distance, 5, 25);
    force.normalize();
    var strength = (this.G * this.mass * other.mass) / (distance * distance);
    force.mult(strength); // force is now equal to 'normal gravitational attraction'
    var sizeDiff = abs(other.radius - this.radius);
    // Similar size attracts, different size repels
    // as sizeDiff approaches zero, strength should be mult.(1)
    // as sizeDiff increases, strength should be mult.(-1)
    var sizeFactor = map(sizeDiff, 0, 80, -1, 1);
    force.mult(sizeFactor);
    return force;
  }

  this.applyForce = function(force) {
    this.acceleration = createVector (0,0);
    var f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
    this.velocity.add(this.acceleration);
  } 
 
  this.update = function() {
    // Function where cell position and other things are updated
    this.velocity.mult(0.8);
    this.position.add(this.velocity);
  }
  
  this.display = function(i) {
    // Function where the cell is rendered to the canvas
    fill(this.color);
    push();
    translate(this.position.x, this.position.y); // translate to the location of the walker object
    rotate(this.velocity.heading()); // rotate to the heading of the velocity vector
    textSize(this.radius*2);
    //text(i,0,0)
    ellipse (0, 0, this.radius, this.radius);
    pop();
  }
  
  this.wraparound = function () { // Simple wraparound detection
    if (this.position.x > width) {this.position.x = 0;} 
    if (this.position.x < 0) {this.position.x = width;}
    if (this.position.y > height) {this.position.y = 0;}
    if (this.position.y < 0) {this.position.y = height;}
  }
  
  this.bounce = function () { // Simple wraparound detection
    if (this.position.x > width) {this.position.x = width; this.velocity.x *= -1} 
    if (this.position.x < 0) {this.position.x = 0; this.velocity.x *= -1}
    if (this.position.y > height) {this.position.y = height; this.velocity.y *= -1}
    if (this.position.y < 0) {this.position.y = 0; this.velocity.y *= -1}
  }
}