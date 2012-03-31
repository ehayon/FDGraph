$(document).ready(function() {
	var can = document.getElementById("can");
	var myCanvas = new Canvas(can);
	
	// create some nodes and connections
	var node1 = new Node(300, 200);
	var node2 = new Node(200, 500);
	var node3 = new Node(400, 200);
	var connection1 = new Connection(node1, node2);
	var connection2 = new Connection(node2, node3);
	var connection3 = new Connection(node1, node3);
	
	// add elements to the canvas object
	myCanvas.add(connection1);	
	myCanvas.add(connection2);
	myCanvas.add(connection3);
	myCanvas.add(node1);
	myCanvas.add(node2);
	myCanvas.add(node3);

});
