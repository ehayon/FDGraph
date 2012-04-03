function Graph(c) {
	this.nodes = [];
	this.edges = [];
	this.config = [];
	this.config['canvas'] = c;
	this.config['origin'] = 
	this.damping = .000005;
	this.timestep = 150;
	this.kineticenergy = 1;
	this.total_node_velocity = 0;
	this.done_rendering = false;
	
	var g = this;
	setInterval(function() { 
		if(!g.done_rendering) {
			g.checkRedraw();
		} else {
			g.resetNodes();
		}
		if(g.config['canvas'].dragging) {
			g.resetNodes();
			g.done_rendering = false;
		}
	}, 30);
}
Graph.prototype.addNode = function(n) {
	this.nodes.push(n);
	this.config['canvas'].add(n);
	this.checkRedraw();
}
Graph.prototype.addEdge = function(e) {
	this.edges.push(e);
	this.config['canvas'].add(e);
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
		if(this.config['canvas'].selection == null || this.config['canvas'].selection != node) {
			for(var j = 0; j < this.edges.length; j++) {
				var con = this.edges[j];
				if(con.a == node || con.b == node) {
					// calculate the attractive force between nodes
					var other_node = (con.a == node) ? con.b : con.a;
					node.applyAttractiveForce(other_node);
					// calculate the repulsive force between nodes
					for(var k = 0; k < this.nodes.length; k++) {
						var rep_node = this.nodes[k];
						node.applyRepulsiveForce(rep_node);	
					}
					// we eventually want to stop the nodes from moving
					node.netforcex = (Math.abs(node.netforcex) < 1) ? 0 : node.netforcex;
					node.netforcey = (Math.abs(node.netforcey) < 1) ? 0 : node.netforcey;
					// set the velocity of the nodes based on their net force
					node.velocityx = (node.netforcex == 0) ? 0 : (node.velocityx + this.timestep * node.netforcex) * this.damping;
					node.velocityy = (node.netforcey == 0) ? 0 : (node.velocityy + this.timestep * node.netforcey) * this.damping;
				}
			}	
		}
		
		// move the nodes scaled by constant timestep
		node.x += node.velocityx * this.timestep;
		node.y += node.velocityy * this.timestep;
		// magnitude of the velocity vector
		var velocity = Math.abs(Math.sqrt((node.velocityx*node.velocityx) + (node.velocityy*node.velocityy)));
		// keep track of the net velocity of the entire system
		this.total_node_velocity += velocity;
		
		this.kineticenergy += node.mass * (velocity*velocity);
	}	
	if(this.total_node_velocity == 0) {
		this.config['canvas'].valid = true;
		this.done_rendering = true;
	} else {
		this.config['canvas'].valid = false;
		this.done_rendering = false;
	}
}

/*
 * Node
 */
function Node(label, charge) {
	this.position = new Point(
		Math.floor(Math.random()*1000),
		Math.floor(Math.random()*1000)	
	);
	Circle.call(this, this.x, this.y, 10);
	Point.call(this, this.x, this.y);
	this.x = this.position.x; // makes it easier to access the point
	this.y = this.position.y; // makes it easier to access the point
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
Node.prototype.distance = function(n) {
	return Math.sqrt(
		((this.x - n.x)*(this.x - n.x)) + 
		((this.y - n.y)*(this.y - n.y))
	);
}
Node.prototype.applyAttractiveForce = function(n) {
	var distance = this.distance(n);
	var force = .1 * Math.max(distance + 350, 1);
	this.netforcex += force * Math.sin((n.x - this.x)/distance);
	this.netforcey += force * Math.sin((n.y - this.y)/distance);
}
Node.prototype.applyRepulsiveForce = function(n) {
	var d = Math.max(this.distance(n), 1);
	// calculate repulsion force between nodes
	var f = -1 * ((this.charge * n.charge) / (d * d));
	this.netforcex += f * Math.sin((n.x - this.x)/d);
	this.netforcey += f * Math.sin((n.y - this.y)/d);	
}

function Edge(a, b) {
	Line.call(this, a.x, a.y, b.x, b.y);
	this.a = a;
	this.b = b;
	this.draggable = false;
}
Edge.prototype = Object.create(new Line());
// we need to override the draw method so it updates on a redraw
Edge.prototype.draw = function(ctx) {
	ctx.strokeStyle = "#B2B2B2";
	ctx.beginPath();
	ctx.moveTo(this.a.x, this.a.y);
	ctx.lineTo(this.b.x, this.b.y);
	ctx.stroke();
}

function Point(x, y) {
	this.x = x;
	this.y = y;
}
Point.prototype.distance = function(n) {
	return Math.sqrt(
		((this.x - n.x)*(this.x - n.x)) + 
		((this.y - n.y)*(this.y - n.y))
	);
}