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

var cells = []; // array for all cells
var bkgcol = 0; // background color
var bounce = false; //to enable 'floorBounce()'

function setup() {
  createCanvas(windowWidth, windowHeight);
  //frameRate(10);
  background (bkgcol);
  p = new Parameters();
  gui = new dat.GUI();
  initGUI();
  //noStroke();
  stroke(0);
  colorMode (HSB, 360, 100, 100);
  //var population = 1; // number of cells in the array
  var population = random(5,20); // number of cells in the array
  for (var i = 0; i < population; i++) { // Fill the array with a population of Cell objects
    cells.push(new Cell(random(width), random(height)));
  }
}

function draw() {
  //trails();
  //background(bkgcol);
  for (var i = 0; i < cells.length; i++) { // Iterate through the cells array, cell by cell
    for (var j = 0; j < cells.length; j++) { // Iterate through the other cells in the array
      if (i !== j) {
        var attraction = cells[i].calculateForce(cells[j]); // calculate attraction between the cell[i] and cell[j]
        cells[i].applyForce(attraction); // apply the calculated attraction to cell[i]
        cells[i].update();
      }
    }
    
    if (bounce) {cells[i].bounce();} else {cells[i].wraparound();}
    cells[i].display(i);
  }
}

function trails() {
  blendMode(DIFFERENCE);
  fill(1);
  rect(0,0,width, height);
  blendMode(BLEND);
  fill(255);
}

function mousePressed() {
  cells.push(new Cell(mouseX, mouseY));
}

function mouseDragged() {
  cells.push(new Cell(mouseX, mouseY));
}

var initGUI = function () {

	var f1 = gui.addFolder('Population');
	  var controller = f1.add(p, 'G', 1, 10).step(1).name('Gravity')
	    controller.onChange(function(value) {populateColony(); });
    var controller = f1.add(p, 'centerSpawn').name('Centered').listen();
	    controller.onChange(function(value) {populateColony(); });
}

var Parameters = function () { 
  this.G = 10; // Gravity constant
}
