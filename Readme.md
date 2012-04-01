##HTML5 Canvas Graph (data structure)
##### Created by Ethan Hayon

#####Demo
> http://ethanhayon.com/Canvas/

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
var node = new Node();
```
```javascript
var node1 = new Node();
var node2 = new Node();
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
