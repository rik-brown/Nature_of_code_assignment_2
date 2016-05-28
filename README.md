# Nature_of_code_assignment_2
Assignment 2 for Kadenze p5.js "Nature of Code" course

My idea is to generate a population of cell-like agents who are visually unique (e.g. different color, size & mass) that experience forces of attraction/repulsion towards each other.
The magnitude of the force will be proportional to the distance between the cells, as well as to their properties.
E.g. Similar colours attract, opposites repel, or similar sizes attract, opposites repel.
Something along those lines, at least...

New idea: There are some 'attractor' cells which move around in a circular 'orbit' around their given position. These will exert a constantly changing force on the particles which fall down from the top of the screen at a given interval.

Assignments goals:

Objects
The code creates an object with the constructor function.

Vectors
The object stores its position, velocity, and acceleration as vectors. (Use a minimum of 3 vectors inside your class.)

Mass
The object incorporates a mass variable. Be sure to name one your object's variables 'mass'.

Forces
Create a function inside your object called 'applyForce' that has at least one argument.

Apply Forces
Pass forces into your object through an argument in the applyForce() function inside your object. Use this function at least once.

Design
The moving objects' design is different from the plain examples shown in the lecture.

Code Comments
The code includes comments to describe what it is doing throughout. There should be a relative number of lines of comments compared to lines of code.

Compiles
The code compiles and has no errors.

Multiple Objects 
Use an array to manage a list of objects that vary according to one or two parameters (mass, initial velocity, etc.)

