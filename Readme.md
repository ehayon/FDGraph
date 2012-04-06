##HTML5 Canvas Graph (data structure)
##### Created by Ethan Hayon

#####Demo
> http://ethanhayon.com/Canvas/

#####Get the canvas element from the DOM
```javascript
var canvas = document.getElementById("canvas");
```

#####Create a new Canvas object:
```javascript
var myCanvas = new Canvas(canvas);
```

#####Create a Graph object:
```javascript
var myGraph = new Graph(myCanvas);
```

#####To create a node:
```javascript
var node = new Node("label", charge);
```
```javascript
var node1 = new Node("A", 100);
var node2 = new Node("B", 120);
```

#####To create a connection between two nodes:
```javascript
var edge = new Edge(node1, node2)
```

#####Add objects to the canvas object:
```javascript
myGraph.add(connection);
myGraph.add(node1);
myGraph.add(node2);
```
