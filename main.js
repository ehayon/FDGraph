$(document).ready(function() {
	var can = document.getElementById("can");
	var myCanvas = new Canvas(can);
	var myGraph = new Graph(myCanvas);
	// create some nodes and connections
	var node1 = new Node("test", 200);
	var node2 = new Node("test", 200);
	var node3 = new Node("test", 200);
	var node4 = new Node("test", 200);
	var node5 = new Node("test", 200);
	var node6 = new Node("test", 70);
	var node7 = new Node("test", 70);
	var node8 = new Node("test", 70);
	var node9 = new Node("test", 70);
	var node10 = new Node("test", 70);
	var node11 = new Node("test", 70);
	var node12 = new Node("test", 70);
	var node13 = new Node("test", 70);
	var node14 = new Node("test", 90);
	var node15 = new Node("test", 90);
	var node16 = new Node("test", 90);
	var node17 = new Node("test", 90);
	var node18 = new Node("test", 90);
	var node19 = new Node("test", 90);

	
	var connection1 = new Edge(node1, node2);
	var connection2 = new Edge(node2, node3);
	var connection3 = new Edge(node3, node4);
	var connection4 = new Edge(node4, node5);
	var connection5 = new Edge(node5, node1);
	var connection6 = new Edge(node1, node6);
	var connection7 = new Edge(node2, node7);
	var connection8 = new Edge(node3, node8);
	var connection9 = new Edge(node4, node9);
	var connection10 = new Edge(node5, node10);
	var connection11 = new Edge(node6, node7);
	var connection12 = new Edge(node7, node8);
	var connection13 = new Edge(node8, node9);
	var connection14 = new Edge(node9, node10);
	var connection15 = new Edge(node10, node6);
	var connection16 = new Edge(node11, node12);
	var connection17 = new Edge(node12, node13);
	var connection18 = new Edge(node13, node11);
	var connection19 = new Edge(node14, node15);
	var connection20 = new Edge(node15, node16);
	var connection21 = new Edge(node16, node17);
	var connection22 = new Edge(node17, node18);
	var connection23 = new Edge(node18, node19);

	
	

	myGraph.addEdge(connection1);
	myGraph.addEdge(connection2);
	myGraph.addEdge(connection3);
	myGraph.addEdge(connection4);
	myGraph.addEdge(connection5);
	myGraph.addEdge(connection6);
	myGraph.addEdge(connection7);
	myGraph.addEdge(connection8);
	myGraph.addEdge(connection9);
	myGraph.addEdge(connection10);
	myGraph.addEdge(connection11);
	myGraph.addEdge(connection12);
	myGraph.addEdge(connection13);
	myGraph.addEdge(connection14);
	myGraph.addEdge(connection15);
	
	
	myGraph.addNode(node1);
	myGraph.addNode(node2);
	myGraph.addNode(node3);
	myGraph.addNode(node4);
	myGraph.addNode(node5);
	myGraph.addNode(node6);
	myGraph.addNode(node7);
	myGraph.addNode(node8);
	myGraph.addNode(node9);
	myGraph.addNode(node10);
	myGraph.addNode(node11);
	myGraph.addNode(node12);
	myGraph.addNode(node13);
	myGraph.addNode(node14);
	myGraph.addNode(node15);
	myGraph.addNode(node16);
	myGraph.addNode(node17);
	myGraph.addNode(node18);
	myGraph.addNode(node19);
		

	
	


});
