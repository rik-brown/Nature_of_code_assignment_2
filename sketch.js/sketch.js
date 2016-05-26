/*
* Kadenze
* Nature of Code course
* Assignment 2 : Physics
* Richard Brown
* Deliverables:
* Objects: The code creates an object with the constructor function.
* Vectors: The object stores its position, velocity, and acceleration as vectors. (Use a minimum of 3 vectors inside your class.)
* Mass: The object incorporates a mass variable. Be sure to name one your object's variables 'mass'.
* Forces: Create a function inside your object called 'applyForce' that has at least one argument.
* Apply Forces: Pass forces into your object through an argument in the applyForce() function inside your object. Use this function at least once.
* Design: The moving objects' design is different from the plain examples shown in the lecture.
* Code Comments: The code includes comments to describe what it is doing throughout. There should be a relative number of lines of comments compared to lines of code.
* Compiles: The code compiles and has no errors.
* Multiple Objects: Use an array to manage a list of objects that vary according to one or two parameters (mass, initial velocity, etc.)
*
*/

var colony = []; // array for all cells
var bkgcol = 0; // background color


function setup() {
  createCanvas(800, 600);
  background (bkgcol);
  colorMode (HSB, 360, 100, 100);
  var population = random(5,20); // number of cells in the colony
  for (var i = 0; i < population; i++) { // Fill the colony array with a population of Cell objects
    colony.push(new Cell());
  }
}

function draw() {
  for (var i = 0; i < colony.length; i++) { // Iterate through the colony array, cell by cell
  colony[i].update();
  colony[i].checkCanvasLimits();
  colony[i].display();
  }
}

function Cell () {
  // Constructor for cell object
  this.position = createVector (random(width), random(height)); // Cell starts at random position
  this.velocity = createVector (0, 0); // Initial velocity is 0
  this.radius = random(10,30);
  this.color = color(random(360), random(50,100), random(50,100));
  
  this.update = function() {
    // Function where cell position and other things are updated
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
  
  this.checkCanvasLimits = function () { // Simple wraparound detection
    if (this.position.x > width) {this.position.x = 0;} 
    if (this.position.x < 0) {this.position.x = width;}
    if (this.position.y > height) {this.position.y = 0;}
    if (this.position.y < 0) {this.position.y = height;}
  }
}
