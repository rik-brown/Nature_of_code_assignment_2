function Cell () {
  // Constructor for cell object
  this.position = createVector (random(width), random(height)); // Cell starts at random position
  this.velocity = createVector (0, 0); // Initial velocity is 0
  this.radius = random(10,30);
  this.color = color(random(360), random(50,100), random(50,100));
  
  this.applyForce = function(force) {
    this.acceleration = createVector (0,0);
    this.acceleration.add(force);
    this.velocity.add(this.acceleration);
  }
  
  this.update = function() {
    // Function where cell position and other things are updated
    this.velocity.mult(0.95);
    this.position.add(this.velocity);
  }
  
  this.display = function() {
    // Function where the cell is rendered to the canvas
    fill(this.color);
    push();
    translate(this.position.x, this.position.y); // translate to the location of the walker object
    rotate(this.velocity.heading()); // rotate to the heading of the velocity vector
    ellipse (0, 0, this.radius, this.radius);
    pop();
  }
  
  this.wraparound = function () { // Simple wraparound detection
    if (this.position.x > width) {this.position.x = 0;} 
    if (this.position.x < 0) {this.position.x = width;}
    if (this.position.y > height) {this.position.y = 0;}
    if (this.position.y < 0) {this.position.y = height;}
  }
  
  this.floorBounce = function () { // Simple floor detection
    if (this.position.y > height) {
      this.position.y = height;
      this.velocity.y *= -1;
    }
  }
}