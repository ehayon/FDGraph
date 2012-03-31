/* Shapes can be drawn on the canvas */
function Shape(x, y, w, h) {
	this.x = x || 0;
	this.y = y || 0;
	this.w = w || 10;
	this.h = h || 10;
	this.fill = "#000";
}

Shape.prototype.draw = function(ctx) {
	ctx.fillStyle = this.fill;
	ctx.fillRect(this.x, this.y, this.w, this.h);
}
Shape.prototype.contains = function(mx, my) {
  return  (this.x <= mx) && (this.x + this.w >= mx) &&
          (this.y <= my) && (this.y + this.h >= my);
}
Shape.prototype.drawBorder = function(ctx) {
	ctx.strokeStyle = "#FF1100";
	ctx.strokeRect(this.x, this.y, this.w, this.h);
}

/* canvas state is needed to keep track of shapes currently drawn on our canvas */
function Canvas(canvas)
{
	this.width = canvas.width;
	this.height = canvas.height;
	this.valid = true;
	this.dragging = false;
	this.active = true;
	this.selection = null;
	this.dragoffx = 0;
	this.dragoffy = 0;
	this.shapes = [];
	this.ctx = canvas.getContext("2d");
	
	var mystate = this;
	
	canvas.addEventListener("mousedown", function(e) {
		var shapes = mystate.shapes
		mystate.dragging = true;
		for(var i = 0; i < shapes.length; i++) {
			if(shapes[i].contains(e.x, e.y)) {
				mystate.selection = shapes[i];
				shapes[i].drawBorder(mystate.ctx);
		        mystate.dragoffx = e.x - mystate.selection.x;
		        mystate.dragoffy = e.y - mystate.selection.y;
				mystate.valid = false;
			}
		}
	});
	canvas.addEventListener("mouseup", function(e) {
		if(mystate.dragging) {
			// we are currently dragging a shape
			mystate.valid = false;	// canvas has changed
			mystate.dragging = false;
		}
	});
	canvas.addEventListener("mousemove", function(e) {
		if(mystate.selection != null && mystate.dragging) {
			var selected = mystate.selection;
			mystate.selection.x = e.x - mystate.dragoffx;
			mystate.selection.y = e.y - mystate.dragoffy;
			mystate.valid = false;		
		}
	});
}
Canvas.prototype.add = function(shape) {
	this.shapes.push(shape);
	this.valid = false;
	this.redraw();
}
Canvas.prototype.redraw = function() {
	if(!this.valid) {
		this.clear();
		this.draw();		
	}

}
Canvas.prototype.clear = function() {
	this.ctx.clearRect(0, 0, this.width, this.height);
}
Canvas.prototype.draw = function() {
	// only draw if we need to...
	var shapes = this.shapes;
	for(var i = 0; i < shapes.length; i++) {
		shapes[i].draw(this.ctx);
	}
    if(this.selection != null) {
    	this.ctx.strokeColor = "#FF0000";
		this.ctx.strokeRect(this.selection.x, this.selection.y, this.selection.w, this.selection.h);
    }
	this.valid = true;		
	
}
$(document).ready(function() {
	var can = document.getElementById("can");
	var shape1 = new Shape(110, 200, 90, 30);
	var shape2 = new Shape(10, 10, 40, 40);
	var myCanvas = new Canvas(can);
	myCanvas.add(shape1);
	myCanvas.add(shape2);
	setInterval(function() { myCanvas.redraw(); }, 10);

});