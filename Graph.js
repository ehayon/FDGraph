function Graph(canvas_object) {
	this.nodes = [];
	this.connections = [];
	this.canvas = canvas_object;
	this.damping = .000001;
	var myGraph = this;
	setInterval(function() { 
		if(!myGraph.canvas.dragging) {
			myGraph.checkRedraw();
		}
	}, 10);
	// add elements to the canvas object
	this.timestep = 1;
	this.kineticenergy = 1;
	this.running = true;
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
Graph.prototype.checkRedraw = function() {
	// compute the force on each connection
	// only update if net force is greater than threshold
	this.kineticenergy = 0;
	for(var i = 0; i < this.nodes.length; i++) {
		var node = this.nodes[i];
		node.netforcex = 0;
		node.netforcey = 0;
		node.velocityx = 0;
		node.velocityy = 0;
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
				
				
				node.netforcex += force * Math.sin((other_node.x - node.x)/distance);
				node.netforcey += force * Math.sin((other_node.y - node.y)/distance);
				
				for(var k = 0; k < this.nodes.length; k++) {
					var rep_node = this.nodes[k];
					var rep_distance = Math.max(Math.sqrt(((node.x - rep_node.x)*(node.x - rep_node.x)) + ((node.y - rep_node.y)*(node.y - rep_node.y))), 1);
					var rep_angle = Math.sin((rep_node.y - node.y) / rep_distance);
					// calculate repulsion force between nodes
					var rep_force = -1 * (100000/(rep_distance*rep_distance));
					node.netforcex += rep_force * Math.sin((rep_node.x - node.x)/rep_distance);
					node.netforcey += rep_force * Math.sin((rep_node.y - node.y)/rep_distance);		
				}
				
				node.netforcex = (Math.abs(node.netforcex) < 1) ? 0 : node.netforcex;
				node.netforcey = (Math.abs(node.netforcey) < 1) ? 0 : node.netforcey;

				node.velocityx = (node.velocityx + this.timestep * node.netforcex) * this.damping;
				node.velocityy = (node.velocityy + this.timestep * node.netforcey) * this.damping;
				var velocity = Math.abs(Math.sqrt((node.velocityx*node.velocityx) + (node.velocityy*node.velocityy)));
			
				this.kineticenergy += node.mass * (velocity*velocity);
				//console.log(this.kineticenergy);
				//console.log(node.netforcex);
				console.log("forcex = " + node.netforcex + " | forcey = " + node.netforcey);
			}
		}	
		node.x += node.velocityx * this.timestep;
		node.y += node.velocityy * this.timestep;
		//console.log(this.kineticenergy);
	}	
	this.timestep++;
	this.canvas.valid = false;
}

function Node() {
	this.x = Math.floor(Math.random()*1000);
	this.y = Math.floor(Math.random()*1000);
	//console.log("("+this.x+", "+this.y+")");
	Circle.call(this, this.x, this.y, 30);
	this.charge = 40;
	this.mass = 100;
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
