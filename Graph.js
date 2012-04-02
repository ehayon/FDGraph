function Graph(canvas_object) {
	this.nodes = [];
	this.connections = [];
	this.canvas = canvas_object;
	this.damping = .0000005;
	var myGraph = this;
	
	setInterval(function() { 
		if(!myGraph.done_rendering) {
			myGraph.checkRedraw();
		} else {
			myGraph.resetNodes();
		}
		if(myGraph.canvas.dragging) {
			myGraph.resetNodes();
			myGraph.done_rendering = false;
		}
	}, 30);
	// add elements to the canvas object
	this.timestep = 1;
	this.kineticenergy = 1;
	this.total_node_velocity = 0;
	this.done_rendering = false;
}
Graph.prototype.addNode = function(node) {
	this.nodes.push(node);
	this.canvas.add(node);
	this.checkRedraw();
}
Graph.prototype.addConnection = function(connection) {
	this.connections.push(connection);
	this.canvas.add(connection);
}
Graph.prototype.resetNodes = function() {
	for(var i = 0; i < this.nodes.length; i++) {
		var n = this.nodes[i];
		n.reset();
	}
}
Graph.prototype.checkRedraw = function() {
	// compute the force on each connection
	// only update if net force is greater than threshold
	this.kineticenergy = 0;
	this.total_node_velocity = 0;
	for(var i = 0; i < this.nodes.length; i++) {
		var node = this.nodes[i];
		node.netforcex = 0;
		node.netforcey = 0;
		node.velocityx = 0;
		node.velocityy = 0;
		if(this.canvas.selection == null || this.canvas.selection != node) {
			for(var j = 0; j < this.connections.length; j++) {
				var con = this.connections[j];
				if(con.a == node || con.b == node) {
					var other_node = (con.a == node) ? con.b : con.a;
					var distance = Math.sqrt(((node.x - other_node.x)*(node.x - other_node.x)) + ((node.y - other_node.y)*(node.y - other_node.y)));
					var force = .1 * Math.max(distance + 350, 1);
					node.netforcex += force * Math.sin((other_node.x - node.x)/distance);
					node.netforcey += force * Math.sin((other_node.y - node.y)/distance);
					for(var k = 0; k < this.nodes.length; k++) {
						var rep_node = this.nodes[k];
						var rep_distance = Math.max(Math.sqrt(((node.x - rep_node.x)*(node.x - rep_node.x)) + ((node.y - rep_node.y)*(node.y - rep_node.y))), 1);
						// calculate repulsion force between nodes
						var rep_force = -1 * ((node.charge * rep_node.charge)/(rep_distance*rep_distance));
						node.netforcex += rep_force * Math.sin((rep_node.x - node.x)/rep_distance);
						node.netforcey += rep_force * Math.sin((rep_node.y - node.y)/rep_distance);		
					}
					node.netforcex = (Math.abs(node.netforcex) < 1.5) ? 0 : node.netforcex;
					node.netforcey = (Math.abs(node.netforcey) < 1.5) ? 0 : node.netforcey;
					node.velocityx = (node.netforcex == 0) ? 0 : (node.velocityx + this.timestep * node.netforcex) * this.damping;
					node.velocityy = (node.netforcey == 0) ? 0 : (node.velocityy + this.timestep * node.netforcey) * this.damping;
				}
			}	
		}
		node.x += node.velocityx * this.timestep;
		node.y += node.velocityy * this.timestep;
		var velocity = Math.abs(Math.sqrt((node.velocityx*node.velocityx) + (node.velocityy*node.velocityy)));
		this.total_node_velocity += velocity;
		this.kineticenergy += node.mass * (velocity*velocity);
	}	
	if(this.total_node_velocity == 0) {
		this.canvas.valid = true;
		this.done_rendering = true;
	} else {
		this.canvas.valid = false;
		this.done_rendering = false;
		this.timestep++;
	}
}

function Node(label, charge) {
	this.x = Math.floor(Math.random()*1000);
	this.y = Math.floor(Math.random()*1000);
	Circle.call(this, this.x, this.y, 10);
	this.charge = charge || 60;
	this.mass = 100;
	this.velocityx = 0;
	this.velocityy = 0;
	this.netforcex = 0;
	this.netforcey = 0;
	this.label = label;
}
Node.prototype = Object.create(new Circle());
Node.prototype.reset = function() {
	this.velocityx = 0;
	this.velocityy = 0;
	this.netforcex = 0;
	this.netforcey = 0;
}

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
