/* Shapes can be drawn on the canvas */
/*
 * Shape
 * x - x position
 * y - y position
 * w - width
 * h - height
 */

function Shape(x, y) {
	this.x = x || 0;
	this.y = y || 0;
	this.fill = "#000";
	this.draggable = true;
}

Shape.prototype.draw = function(ctx) {
	ctx.fillStyle = this.fill;
	ctx.fillRect(this.x, this.y, this.w, this.h);
}
Shape.prototype.contains = function(ex, ey) {
  return  (this.x <= ex) && (this.x + this.w >= ex) &&
          (this.y <= ey) && (this.y + this.h >= ey);
}
Shape.prototype.drawBorder = function(ctx) {
	ctx.strokeStyle = "#00FF00";
	ctx.strokeRect(this.x, this.y, this.w, this.h);
}

/*
 * Rectangle
 * superclass: Shape
 * x - x position
 * y - y position
 * w - width
 * h - height
 */
function Rectangle(x, y, w, h) {
	Shape.apply(this, arguments);
	this.w = w || 10;
	this.h = h || 10;
}
Rectangle.prototype = Object.create(new Shape());

/*
 * Circle
 * superclass: Shape
 * x - x position
 * y - y position
 * d - diameter
 */

function Circle(x, y, d) {
	Shape.call(this, x, y);
	this.d = d;
}
Circle.prototype = Object.create(new Shape());
Circle.prototype.draw = function(ctx) {
	ctx.fillStyle = "#000000";
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.d/2, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
}
Circle.prototype.drawBorder = function(ctx) {
	ctx.strokeStyle = "#00FF00";
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.d/2, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.stroke();
}
Circle.prototype.contains = function(ex, ey) {
	var distance = Math.sqrt(((ex - this.x)*(ex - this.x)) + ((ey - this.y)*(ey - this.y)));
	return(distance <= this.d/2);
}

function Line(x1, y1, x2, y2) {
	this.x1 = x1; 
	this.y1 = y1;
	this.x2 = x2; 
	this.y2 = y2;
}
Line.prototype.draw = function(ctx) {
	ctx.strokeStyle = "#B2B2B2";
	ctx.beginPath();
	ctx.moveTo(this.x1, this.y1);
	ctx.lineTo(this.x2, this.y2);
	ctx.stroke();
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
	setInterval(function() { mystate.redraw(); }, 10);
	
	canvas.addEventListener("mousedown", function(e) {
		var shapes = mystate.shapes
		mystate.dragging = true;
		for(var i = 0; i < shapes.length; i++) {
			if(shapes[i].draggable && shapes[i].contains(e.x, e.y)) {
				mystate.selection = shapes[i];
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
			mystate.selection = null;
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
		this.selection.drawBorder(this.ctx);
    }
	this.valid = true;		
	
}
/* end of Canvas */

