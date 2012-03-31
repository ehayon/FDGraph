$(document).ready(function() {
	var can = document.getElementById("can");
	var myCanvas = new Canvas(can);
	var myGraph = new Graph(myCanvas);
	// create some nodes and connections
	var node1 = new Node();
	var node2 = new Node();
	var node3 = new Node();
	var connection1 = new Connection(node1, node2);
	var connection2 = new Connection(node2, node3);
	var connection3 = new Connection(node1, node3);

	myGraph.addConnection(connection1);
	myGraph.addConnection(connection2);
	myGraph.addConnection(connection3);

	myGraph.addNode(node1);
	myGraph.addNode(node2);
	myGraph.addNode(node3);

	


});
