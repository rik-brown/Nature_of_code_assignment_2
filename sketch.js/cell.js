function Cell (x, y) {
  // Constructor for cell object
  var mass = 10; // Mass value when equalMass is selected in GUI
  this.position = createVector (x, y); // Cell starts at random position
  this.velocity = createVector (0, 0); // Initial velocity is 0
  
  this.angle = (int(random(p.colors))+1)*360/p.colors; // A random angle in radians, used as basis to calculate color. Number of different colours selected by GUI p.colours
  this.hueVector = p5.Vector.fromAngle(radians(this.angle)); // hueVector needed for 'colorDiff' below (makes possible the 'angleBetween' calculation)
  this.hue = map(this.hueVector.heading(), -PI, PI, 0, 360); // Get a hue value in range 0-360
  
  this.radius = this.angle / 3; // Size is proportional to color
  if (p.equalMass) {this.mass = mass;} else {this.mass = this.radius;} // toggle: all cells have equal mass, or mass proportional to size
  this.G = p.G; // use the value of G selected in the GUI
  
  this.calculateForce = function(other) {
    var force = p5.Vector.sub(other.position, this.position);
    var distance = force.mag();
    distance = constrain(distance, p.distMin, p.distMax); // distance constraints can be adjusted in the GUI
    force.normalize();
    var strength = (this.G * this.mass * other.mass) / (distance * distance);  // standard equation
    force.mult(strength); // force is now equal to 'normal gravitational attraction'
    // My 'twist':
    // Similar colors attract, different color repels
    // as colorDiff approaches zero, force gets mult.(1)
    // as colorDiff increases towards PI, force gets mult.(-1) to become repulsion
    var colorDiff = p5.Vector.angleBetween(this.hueVector, other.hueVector); // A value equal to the 'distance between the hues' of the two colors, this & other
    
    var colorFactor = map(colorDiff, 0, PI, 1, -1);
    force.mult(colorFactor);
    return force;
  }

  this.applyForce = function(force) { // no frills applyForce function
    this.acceleration = createVector (0,0);
    var f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
    this.velocity.add(this.acceleration);
  } 
 
  this.update = function() { // Function where cell position and other things are updated
    this.velocity.mult(p.damping);
    this.position.add(this.velocity);
  }
  
  this.display = function(i) { // Function where the cell is rendered to the canvas
  if (p.trails) {var alpha = 5;} else {alpha = 60;} // need different transparency if background is refreshed 
    push();
    translate(this.position.x, this.position.y); // translate to the location of the walker object
    rotate(this.velocity.heading()); // rotate to the heading of the velocity vector
    strokeWeight(1); // strokeWeight for circle
    stroke(this.hue, 50, 50, alpha*3);
    fill(0, 0, 100, alpha);
    ellipse (0, 0, this.radius, this.radius);
    strokeWeight(8); // strokeWeight for nucleus
    stroke(this.hue, 255, 255, 200);
    point (0,0);
    pop();
  }
  
  this.wraparound = function () { // Simple boundary wraparound detection
    if (this.position.x > width) {this.position.x = 0;} 
    if (this.position.x < 0) {this.position.x = width;}
    if (this.position.y > height) {this.position.y = 0;}
    if (this.position.y < 0) {this.position.y = height;}
  }
  
  this.rebound = function () { // Simple boundary rebound detection
    if (this.position.x > width) {this.position.x = width; this.velocity.x *= -1} 
    if (this.position.x < 0) {this.position.x = 0; this.velocity.x *= -1}
    if (this.position.y > height) {this.position.y = height; this.velocity.y *= -1}
    if (this.position.y < 0) {this.position.y = 0; this.velocity.y *= -1}
  }
}