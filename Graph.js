function Graph(canvas_object) {
	this.nodes = [];
	this.connections = [];
	this.canvas = canvas_object;
	// add elements to the canvas object
}
Graph.prototype.addNode = function(node) {
	this.nodes.push(node);
	this.canvas.add(node);
}
Graph.prototype.addConnection = function(connection) {
	this.connections.push(connection);
	this.canvas.add(connection);
}

function Node() {
	this.x = Math.floor(Math.random()*1000);
	this.y = Math.floor(Math.random()*1000);
	console.log("("+this.x+", "+this.y+")");
	Circle.call(this, this.x, this.y, 30);
}
Node.prototype = Object.create(new Circle());


function Connection(node_a, node_b) {
	Line.call(this, node_a.x, node_a.y, node_b.x, node_b.y);
	this.a = node_a;
	this.b = node_b;
	this.line = new Line(node_a.x, node_b.y);
	this.draggable = false;
	this.force = 0;
}
Connection.prototype = Object.create(new Line());
// we need to override the draw method so it updates on a redraw
Connection.prototype.draw = function(ctx) {
	ctx.strokeStyle = "#B2B2B2";
	ctx.beginPath();
	ctx.moveTo(this.a.x, this.a.y);
	ctx.lineTo(this.b.x, this.b.y);
	ctx.stroke();
}
