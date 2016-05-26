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
var bounce = true; //to enable 'floorBounce()'


function setup() {
  createCanvas(windowWidth, windowHeight);
  background (bkgcol);
  noStroke();
  colorMode (HSB, 360, 100, 100);
  var population = random(5,20); // number of cells in the colony
  for (var i = 0; i < population; i++) { // Fill the colony array with a population of Cell objects
    colony.push(new Cell());
  }
}

function draw() {
  trails();
  for (var i = 0; i < colony.length; i++) { // Iterate through the colony array, cell by cell
    gravity = createVector (0, 0.2);
    wind = createVector (random(0.05, 0.1), 0);
    randomForce = createVector (random(-0.1,0.1), random(-0.1,0.1));
    colony[i].applyForce(gravity);
    colony[i].applyForce(wind);
    //colony[i].applyForce(randomForce);
    colony[i].update();
    //colony[i].floorBounce();
    if (bounce) {colony[i].floorBounce();} else {colony[i].wraparound();}
    colony[i].display();
  }
}

function trails() {
  blendMode(DIFFERENCE);
  fill(1);
  rect(0,0,width, height);
  blendMode(BLEND);
  fill(255);
}
