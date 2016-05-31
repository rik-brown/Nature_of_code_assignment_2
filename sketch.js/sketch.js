/*
* Kadenze
* Nature of Code course
* Assignment 2 : Physics
* Richard Brown
* Revision: A
*/

var cells = []; // array for all cells
var bkgcol = 0; // background color

function setup() {
  createCanvas(windowWidth, windowHeight);
  background (bkgcol);
  p = new Parameters(); // Container for all parameters selectable in the GUI
  gui = new dat.GUI(); // simple GUI using the dat.gui library
  initGUI();
  colorMode (HSB, 360, 255, 255, 255);
  populate(); // Call function to populate the cells array
}

function draw() {
  if (!p.trails) {background(bkgcol);} // Refresh the background when 'trails' toggle is false
  if (p.trails && p.short) {trails();} // Alternative 'short trails' function which uses blendMode
  for (var i = 0; i < cells.length; i++) { // Iterate through the cells array, cell by cell
    for (var j = 0; j < cells.length; j++) { // Iterate through the other cells in the array
      if (i !== j) { // Don't calculate attraction to yourself
        var attraction = cells[i].calculateForce(cells[j]); // calculate attraction between the cell[i] and cell[j]
        cells[i].applyForce(attraction); // apply the calculated attraction to cell[i]
        cells[i].update(); // Update the position
      }
    }
    
    if (p.wraparound) {cells[i].wraparound();} else {cells[i].rebound();}  // check positon relative to canvas boundaries
    cells[i].display(i); // display the cell
  }
}

function populate() {  // create the cells to fill the array with an initial 'spawn'
  background(bkgcol);
  cells = []; // empty the cells array
  //var population = 1; // for debug: number of cells = 1
  for (var i = 0; i < p.population; i++) { // Fill the array with a population of Cell objects
    cells.push(new Cell(random(width), random(height)));
  }
}


function trails() { // pretty!
  blendMode(DIFFERENCE);
  fill(1);
  rect(0,0,width, height);
  blendMode(BLEND);
  fill(255);
}

function mousePressed() { // spawn a cell on mouseclick
  cells.push(new Cell(mouseX, mouseY));
}

function mouseDragged() { // spawn many cells on mousedrag
  cells.push(new Cell(mouseX, mouseY));
}

var initGUI = function () { // build the GUI (call populate() if anything is changed)

  var controller = gui.add(p, 'population', 2, 1000).step(1).name('Population')
	  controller.onChange(function(value) {populate(); });
  var controller = gui.add(p, 'colors', 1, 360).step(1).name('colors')
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
  this.population = 3; // # cells in initial population (range: 2-1000)
  this.colors = 3; // # colors selected in random selection (range 1-360)
  this.equalMass = true; // if true, all cells have same mass. if false, mass is proportional to colorAngle
  this.G = 1; // Gravity constant (range 0.1-5)
  this.distMin = 5; // lower value in constrain command applied to distance (range 0-10)
  this.distMax = 25; // upper value in constrain command applied to distance (range 10-50)
  this.damping = 0.95; // Simple drag effect to dampen velocity (range 0.8-1.0)
  this.trails = true; // true disables background refresh in draw();
  this.short = false; // true enables 'short blending trails' mode
  this.wraparound = true; //true enables wraparound()
}

function keyTyped() {
  if (key === ' ') { //spacebar will re-populate (re-start)
    populate();
  }
}