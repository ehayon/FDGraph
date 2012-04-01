$(document).ready(function() {
	var can = document.getElementById("can");
	var myCanvas = new Canvas(can);
	var myGraph = new Graph(myCanvas);
	// create some nodes and connections
	var node1 = new Node();
	var node2 = new Node();
	var node3 = new Node();
	var node4 = new Node();
	var node5 = new Node();
	var node6 = new Node();
	var node7 = new Node();
	var node8 = new Node();
	
	var connection1 = new Connection(node1, node2);
	var connection2 = new Connection(node2, node3);
	var connection3 = new Connection(node1, node3);
	var connection4 = new Connection(node1, node4);
	var connection5 = new Connection(node1, node5);
	var connection6 = new Connection(node1, node6);
	var connection7 = new Connection(node2, node7);
	var connection8 = new Connection(node2, node8);
	var connection9 = new Connection(node3, node8);
	var connection10 = new Connection(node4, node7);
	

	myGraph.addConnection(connection1);
	myGraph.addConnection(connection2);
	myGraph.addConnection(connection3);
	myGraph.addConnection(connection4);
	myGraph.addConnection(connection5);
	myGraph.addConnection(connection6);
	myGraph.addConnection(connection7);
	myGraph.addConnection(connection8);
	myGraph.addConnection(connection9);
	myGraph.addConnection(connection10);

	

	myGraph.addNode(node1);
	myGraph.addNode(node2);
	myGraph.addNode(node3);
	myGraph.addNode(node4);
	myGraph.addNode(node5);
	myGraph.addNode(node6);
	myGraph.addNode(node7);
	myGraph.addNode(node8);

	
	


});
