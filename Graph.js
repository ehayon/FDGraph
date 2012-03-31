function Node(x, y) {
	Circle.call(this, x, y, 30);
}
Node.prototype = Object.create(new Circle());

function Connection(node_a, node_b) {
	Line.call(this, node_a.x, node_a.y, node_b.x, node_b.y);
	this.a = node_a;
	this.b = node_b;
	this.line = new Line(node_a.x, node_b.y);
	this.draggable = false;
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