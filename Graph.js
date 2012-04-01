function Graph(canvas_object) {
	this.nodes = [];
	this.connections = [];
	this.canvas = canvas_object;
	this.damping = .00001;
	var myGraph = this;
	setInterval(function() { myGraph.checkRedraw() }, 30);
	// add elements to the canvas object
	this.timestep = 0;
	this.kineticenergy = 0;
}
Graph.prototype.addNode = function(node) {
	this.nodes.push(node);
	this.canvas.add(node);
}
Graph.prototype.addConnection = function(connection) {
	this.connections.push(connection);
	this.canvas.add(connection);
}
Graph.prototype.checkRedraw = function() {
	// compute the force on each connection
	// only update if net force is greater than threshold
	
	for(var i = 0; i < this.nodes.length; i++) {
		var node = this.nodes[i];
		node.netforcex = 0;
		node.netforcey = 0;
		for(var j = 0; j < this.connections.length; j++) {
			var con = this.connections[j];
			if(con.a == node || con.b == node) {
				var other_node = (con.a == node) ? con.b : con.a;
				var distance = Math.sqrt(((node.x - other_node.x)*(node.x - other_node.x)) + ((node.y - other_node.y)*(node.y - other_node.y)));
				
				//node.netforcex += ((node.charge*other_node.charge)/(distance * distance))*Math.cos((other_node.x - node.x)/(distance));
				//node.netforcey += ((node.charge*other_node.charge)/(distance * distance))*Math.sin((other_node.x - node.x)/(distance));
				var dist = Math.max(distance, 1);
				var force = .1 * (distance - 100);
				var angle = Math.sin((other_node.y - node.y) / distance);
				
				
				node.netforcex += 1 * force * Math.sin((other_node.x - node.x)/distance);
				node.netforcey += 1 * force * Math.sin((other_node.y - node.y)/distance);

				node.velocityx = (node.velocityx + this.timestep * node.netforcex) * this.damping;
				node.velocityy = (node.velocityy + this.timestep * node.netforcey) * this.damping;


			}
		}

	
		node.x += node.velocityx * this.timestep;
		node.y += node.velocityy * this.timestep;
	}
	
	
	this.timestep++;
	this.canvas.valid = false;
}

function Node() {
	this.x = Math.floor(Math.random()*1000);
	this.y = Math.floor(Math.random()*1000);
	console.log("("+this.x+", "+this.y+")");
	Circle.call(this, this.x, this.y, 30);
	this.charge = 40;
	this.mass = 1;
	this.velocityx = 0;
	this.velocityy = 0;
	this.netforcex = 0;
	this.netforcey = 0;
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
