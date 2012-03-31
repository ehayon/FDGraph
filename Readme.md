##HTML5 Canvas
###Demo: http://ethanhayon.com/Canvas/
#####Add drag-and-drop functionality to an HTML5 canvas

#####Get the canvas element from the DOM
```javascript
var canvas = document.getElementById("canvas");
```

#####Create a new canvas object:
```javascript
var myCanvas = new Canvas(canvas);
```

#####To create a node:
```javascript
var node = new Node(x, y);
```
```javascript
var node1 = new Node(100, 200);
var node2 = new Node(200, 300);
```

#####To create a connection between two nodes:
```javascript
var connection = new Connection(node1, node2)
```

#####Add objects to the canvas object:
```javascript
myCanvas.add(connection);
myCanvas.add(node1);
myCanvas.add(node2);
```
