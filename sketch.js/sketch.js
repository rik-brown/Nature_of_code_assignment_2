/*
* Kadenze
* Nature of Code course
* Assignment 2 : Physics
* Richard Brown
* Deliverables:
* Objects: The code creates an object with the constructor function. DONE
* Vectors: The object stores its position, velocity, and acceleration as vectors. (Use a minimum of 3 vectors inside your class.) 3 + 1
* Mass: The object incorporates a mass variable. Be sure to name one your object's variables 'mass'. Mass is static, but....
* Forces: Create a function inside your object called 'applyForce' that has at least one argument.DONE
* Apply Forces: Pass forces into your object through an argument in the applyForce() function inside your object. Use this function at least once.
* Design: The moving objects' design is different from the plain examples shown in the lecture.
* Code Comments: The code includes comments to describe what it is doing throughout. There should be a relative number of lines of comments compared to lines of code.
* Compiles: The code compiles and has no errors.
* Multiple Objects: Use an array to manage a list of objects that vary according to one or two parameters (mass, initial velocity, etc.)
*
* TO DO:
* + Think about some way of making the size parameter 'wraparound'
*   It is currently linear, meaning there are colours at the 'top' and the 'bottom'
*   Is it possible to use instead heading() and anglebetween for a circular range? STARTED
* + It would also be very cool if you could select the number of colours (upto 360, perhaps?)
*/

var cells = []; // array for all cells
var bkgcol = 0; // background color

function setup() {
  createCanvas(windowWidth, windowHeight);
  background (bkgcol);
  p = new Parameters();
  gui = new dat.GUI();
  initGUI();
  colorMode (HSB, 360, 255, 255, 255);
  populate();
}

function draw() {
  if (!p.trails) {background(bkgcol);} // Refresh the background when 'trails' toggle is false
  if (p.trails && p.short) {trails();}
  for (var i = 0; i < cells.length; i++) { // Iterate through the cells array, cell by cell
    for (var j = 0; j < cells.length; j++) { // Iterate through the other cells in the array
      if (i !== j) { // Don't calculate attraction to yourself
        var attraction = cells[i].calculateForce(cells[j]); // calculate attraction between the cell[i] and cell[j]
        cells[i].applyForce(attraction); // apply the calculated attraction to cell[i]
        cells[i].update();
      }
    }
    
    if (p.wraparound) {cells[i].wraparound();} else {cells[i].rebound();}
    cells[i].display(i);
  }
}

function populate() {
  background(bkgcol);
  cells = []; // empty the cells array
  //var population = 1; // for debug: number of cells = 1
  for (var i = 0; i < p.population; i++) { // Fill the array with a population of Cell objects
    cells.push(new Cell(random(width), random(height)));
  }
}


function trails() { // Currently not called, needs another toggle in the GUI
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

  var controller = gui.add(p, 'population', 2, 1000).step(1).name('Population')
	  controller.onChange(function(value) {populate(); });
  var controller = gui.add(p, 'colours', 2, 360).step(1).name('Colours')
	  controller.onChange(function(value) {populate(); });
  var controller = gui.add(p, 'equalMass').name('Equal mass')
	  controller.onChange(function(value) {populate(); });
  var controller = gui.add(p, 'G', 0.1, 5).step(0.1).name('Gravity')
	  controller.onChange(function(value) {populate(); });
	var controller = gui.add(p, 'distMin', 0, 10).step(1).name('Constrain Min')
	  controller.onChange(function(value) {populate(); });
	var controller = gui.add(p, 'distMax', 10, 50).step(1).name('Constrain Max')
	  controller.onChange(function(value) {populate(); });
	var controller = gui.add(p, 'wraparound').name('Wraparound')
	  controller.onChange(function(value) {populate(); });
	var controller = gui.add(p, 'trails').name('Trails (long)')
	  controller.onChange(function(value) {populate(); });
  var controller = gui.add(p, 'short').name('Trails (short)')
	  controller.onChange(function(value) {populate(); });
	var controller = gui.add(p, 'damping', 0.8, 1.0).step(0.01).name('Damping factor')
	  controller.onChange(function(value) {populate(); });
}

var Parameters = function () { 
  this.population = 3; // # cells in initial population
  this.colours = 2; // # colours selected in random selection
  this.equalMass = true; // if true, all cells have same mass. if false, mass is proportional to colourAngle
  this.G = 1; // Gravity constant
  this.distMin = 5;
  this.distMax = 25;
  this.damping = 0.95; // Simple drag effect to dampen velocity
  this.trails = true; // true disables background refresh in draw();
  this.short = false; // true enables 'short blending trails' mode
  this.wraparound = true; //true enables wraparound()
}

function keyTyped() {
  if (key === ' ') { //spacebar
    populate();
  }
}