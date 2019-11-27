/************************************************************************************
                            SIMPLE JAVASCRIPT GAME LIBRARY

The purpose of this file is provide an assortment of tools to aid in the development
of javascript game projects.  The p5.js library is required as many of the objects,
classes, and functions require this library to work. It can be found at:
https://p5.js.org
************************************************************************************/
/*  
P5 Events List (requires p5.js)

function preload(){}
function setup(){}
function draw(){}

function keyPressed(){}
function keyReleased(){}
function keyTyped(){}

function mouseMoved(){}
function mouseDragged(){}
function mousePressed(){}
function mouseReleased(){}
function mouseClicked(){}
function doubleClicked(){}
function mouseWheel(){}

P5 Global Variables

 if mouseButton == LEFT
 mouseIsPressed
 mouseX
 mouseY

 keyCode
 key
 keyIsPressed
 if keyIsDown(LEFT_ARROW)
*/

"use strict";
function err(msg) { console.error(msg); }

function Canvas(w,h) { return createCanvas(w,h); }
function Graphic(w,h) { return createGraphics(w,h); }
function Vector(x,y) { return createVector(x,y); }

function Mouse() { return new Vector(mouseX, mouseY); }

var Direction = {
  Invalid: -1,
  North: 0,
  East : 1,
  South : 2,
  West : 3,
  NorthEast: 4,
  SouthEast: 5,
  SouthWest: 6,
  NorthWest: 7,
  Left : 8,
  Right : 9,
};

var Color = {
  Red: "#FF0000",
  Maroon: "#800000",
  Crimson: "#DC143C",
  Salmon: "#FA8072",
  Pink: "#FFC0CB",
  HotPink: "#FF1493",
  Orange: "#FFA500",
  DarkOrange: "#FF8C00",
  Gold: "#FFD700",
  Yellow: "#FFFF00",
  LightYellow: "#FFFFE0",
  Manilla: "#FFE4B5",
  Khaki: "#F0E68C",
  Lavender: "#E6E6FA",
  Violet: "#EE82EE",
  Magenta: "#FF00FF",
  DarkMagenta: "#8B008B",
  Purple: "#800080",
  Lime: "#00FF00",
  SeaGreen: "#2E8B57",
  Green: "#00FF00",
  DarkGreen: "#006400",
  Olive: "#808000",
  Teal: "#008080",
  Aqua: "#00FFFF",
  Cyan: "#00FFFF",
  LightCyan: "#E0FFFF",
  Turquoise: "#40E0D0",
  LightBlue: "#ADD8E6",
  SkyBlue: "#87CEEB",
  Blue: "#0000FF",
  DarkBlue: "#00008B",
  Navy: "#000080",
  Bisque: "#FFE4C4",
  Wheat: "#F5DEB2",
  Tan: "#D2B48C",
  Snow: "#FFFAFA",
  MintCream: "#F5FFFA",
  Seashell: "#FFF5EE",
  Ivory: "#FFFFF0",
  Gray: "#808080",
  LightGray: "#D3D3D3",
  DarkGray: "#505050",
  White: "#FFFFFF",
  Black: "#000000"
};

function fillStroke(clrF, clrS) {
  noFill();
  noStroke();
  if (clrF != null) fill(clrF);
  if (clrS != null) stroke(clrS);
}

function chance(perc) {
  //Returns true if percentage chance randomly occurs
  if (perc >= 100) return true;
  if (perc <= 0) return false;
  var c = random(100) + 1;
  return (c <= perc);
}

//Returns an array of perlin noise values
//Ranges between 0.0 and 1.0
function generateNoise(columns, rows, incr = 0.2) {
  var n = [];
  var rOff, cOff;

  rOff = 0;
  for (var r = 0; r < rows; r++) {
    cOff = 0;
    for (var c = 0; c < columns; c++) {
      n.push(noise(cOff, rOff));
      cOff += incr;
    }
    rOff += incr;
  }
  return n;
}


//Node is used for the pathfinding
//algorithm within the Grid class
var NodeStatus = { NOTEVALUATED: 0, CLOSED: 1, OPEN: 2 };
class Node {
  constructor() {
    this.parent = -1;
    this.cost = 1;
    this.scoreG = 0;
    this.scoreH = 0;
    this.scoreF = 0;
    this.status = NodeStatus.NOTEVALUATED;
  }
}

class Grid {
  constructor(col, rw, cW, cH) {
    this._columns = col;
    this._rows = rw;
    this._cellWidth = cW;
    this._cellHeight = cH;
    this.x = 0;
    this.y = 0;
    this.allowHorizontalWrapping = false;
    this.allowVerticalWrapping = false;
  }

  columns() { return this._columns; }
  rows() { return this._rows; }
  size() { return this._columns * this._rows; }
  cellWidth() { return this._cellWidth; }
  cellHeight() { return this._cellHeight; }
  width() { return this._columns * this._cellWidth; }
  height() { return this._rows * this._cellHeight; }

  wrap(horiz, vert) {
    if (arguments.length == 0) {
      this.allowHorizontalWrapping = !this.allowHorizontalWrapping;
      this.allowVerticalWrapping = !this.allowVerticalWrapping;
    } else if (arguments.length == 1) {
      this.allowHorizontalWrapping = horiz;
      this.allowVerticalWrapping = horiz;
    } else {
      this.allowHorizontalWrapping = horiz;
      this.allowVerticalWrapping = vert;
    }
  }

  cell(xOrIndex, optionalY) {
    if (arguments.length < 1 || arguments.length > 2) return null;
    if (arguments[0] == null) return null;

    //Cell object to be returned if passes error check
    var c = {
      x: null,
      y: null,
      index: null,
      row: null,
      column: null,
      width: this.cellWidth(),
      height: this.cellHeight()
    }

    //Error check and set the arguments
    if (arguments.length == 1) {
      if (arguments[0] < 0 || arguments[0] >= this.size()) return null;
      c.index = arguments[0];
    } else {
      if (arguments[0] < this.x || arguments[0] >= this.x + this.width()) return null;
      if (arguments[1] < this.y || arguments[1] >= this.y + this.height()) return null;
      c.x = arguments[0];
      c.y = arguments[1];
    }

    if (c.index != null) {
      //We have the index (i) value, calculate the row,col
      c.column = c.index % this.columns();
      c.row = Math.floor(c.index / this.columns());
    } else {
      //We have a coordinate (x,y), calculate row,col,i
      c.column = Math.floor((c.x - this.x) / c.width);
      c.row = Math.floor((c.y - this.y) / c.height);
      c.index = c.row * this.columns() + c.column;
    }
    c.x = this.x + (c.column * c.width);
    c.y = this.y + (c.row * c.height);
    return c;
  }

  neighborNorth(cellIndex) {
    if (this.cell(cellIndex) == null) return null;
    var n = cellIndex - this.columns();
    if (n < 0 && this.allowVerticalWrapping) n += this.size();
    return n;
  }

  neighborEast(cellIndex) {
    if (this.cell(cellIndex) == null) return null;
    var n = cellIndex + 1;
    if (n % this.columns() == 0) {
      if (this.allowHorizontalWrapping) {
        n -= this.columns();
      } else {
        n = null;
      }
    }
    return n;
  }

  neighborSouth(cellIndex) {
    if (this.cell(cellIndex) == null) return null;
    var n = cellIndex + this.columns();
    if (n >= this.size() && this.allowVerticalWrapping) n -= this.size();
    return n;
  }

  neighborWest(cellIndex) {
    if (this.cell(cellIndex) == null) return null;
    var n = cellIndex - 1;
    if (cellIndex % this.columns() == 0) {
      if (this.allowHorizontalWrapping) {
        n = cellIndex + (this.columns() - 1);
      } else {
        n = null;
      }
    }
    return n;
  }

  neighbor(aCell, direction) {
    if (aCell == null) return null;
    var c = aCell;

    var n = null;
    switch (direction) {
      case (Direction.North):
        n = this.neighborNorth(c.index);
        break;
      case (Direction.NorthEast):
        n = this.neighborNorth(c.index);
        n = this.neighborEast(n);
        break;
      case (Direction.East):
        n = this.neighborEast(c.index);
        break;
      case (Direction.SouthEast):
        n = this.neighborSouth(c.index);
        n = this.neighborEast(n);
        break;
      case (Direction.South):
        n = this.neighborSouth(c.index);
        break;
      case (Direction.SouthWest):
        n = this.neighborSouth(c.index);
        n = this.neighborWest(n);
        break;
      case (Direction.West):
        n = this.neighborWest(c.index);
        break;
      case (Direction.NorthWest):
        n = this.neighborNorth(c.index);
        n = this.neighborWest(n);
        break;
    }
    return this.cell(n);
  }

  //Lowest F score function for pathfinding algorithm
  getLowestFNodeIndex(nodesArray) {
    var lowIndex = null;
    for (var i = 0; i < nodesArray.length; i++) {
      if (nodesArray[i].status == NodeStatus.OPEN) {
        if (lowIndex == null) {
          lowIndex = i;
        } else {
          lowIndex = (nodesArray[i].scoreF <= nodesArray[lowIndex].scoreF ? i : lowIndex);
        }
      }
    }
    return lowIndex;
  }


  //Compute G, H, and F scores for pathfinding algorithm
  computeScores(nodes, nIndex, endIndex, allowDiag) {
    var pIndex = nodes[nIndex].parent;

    //Calculate G Value
    nodes[nIndex].scoreG = 0;
    if (pIndex != -1) {
      nodes[nIndex].scoreG = nodes[pIndex].scoreG;

      //If on same row/column as parent, add 10, otherwise add 14 (if diagonal allowed)
      if (this.cell(pIndex).row == this.cell(nIndex).row ||
        this.cell(pIndex).column == this.cell(pIndex).column) {
        nodes[nIndex].scoreG += 10 * nodes[nIndex].cost;
      } else {
        nodes[nIndex].scoreG += (allowDiag == true ? (14 * nodes[nIndex].cost) : (20 * nodes[nIndex].cost));
      }
    }

    //Calcualte H Value
    nodes[nIndex].scoreH = 0;
    var rowDist = Math.abs(this.cell(nIndex).row - this.cell(endIndex).row);
    var colDist = Math.abs(this.cell(nIndex).column - this.cell(endIndex).column);
    nodes[nIndex].scoreH = (rowDist < colDist ?
      ((4 * rowDist) + (10 * colDist)) :
      ((10 * rowDist) + (4 * colDist)));

    //Calculate F Value
    nodes[nIndex].scoreF = nodes[nIndex].scoreG + nodes[nIndex].scoreH;
  }


  //Returns A* path array
  findPath(startIndex, endIndex, costArray, allowDiag) {
    var path = [];
    if (allowDiag == null) allowDiag = false;

    if (startIndex < 0 || startIndex >= this.size()) return path;
    if (endIndex < 0 || endIndex >= this.size()) return path;

    //Create nodes
    var nodes = [];
    for (var i = 0; i < this.size(); i++) {
      nodes.push(new Node());
      var c = (costArray == null ? 1 : costArray[i]);
      nodes[i].cost = c;
    }

    //Add start node to open list
    nodes[startIndex].status = NodeStatus.OPEN;
    this.computeScores(nodes, startIndex, endIndex, allowDiag);

    var neighborCount = (allowDiag == false) ? 4 : 8;
    var thisNode;
    var thisNeighbor;

    while (true) {
      thisNode = this.getLowestFNodeIndex(nodes);
      if (thisNode == null) return path;

      nodes[thisNode].status = NodeStatus.CLOSED;
      if (thisNode == endIndex) break;

      //Check neighbors
      for (var n = 0; n < neighborCount; n++) {
        thisNeighbor = this.neighbor(thisNode, n);
        if (thisNeighbor == null) continue;

        thisNeighbor = thisNeighbor.index;
        if (nodes[thisNeighbor].cost > 0 && nodes[thisNeighbor].status != NodeStatus.CLOSED) {
          //Check to see if neighbor is already open
          if (nodes[thisNeighbor].status == NodeStatus.OPEN) {
            //If it's on the open list, calculate new score and switch to lowest
            var tmpNode = new Node();
            tmpNode.parent = nodes[thisNeighbor].parent;
            tmpNode.cost = nodes[thisNeighbor].cost;
            tmpNode.scoreG = nodes[thisNeighbor].scoreG;
            tmpNode.scoreH = nodes[thisNeighbor].scoreH;
            tmpNode.scoreF = nodes[thisNeighbor].scoreF;
            tmpNode.status = nodes[thisNeighbor].status;

            this.computeScores(nodes, thisNeighbor, endIndex, allowDiag);
            if (nodes[thisNeighbor].scoreG >= tmpNode.scoreG) {
              nodes[thisNeighbor].parent = tmpNode.parent;
              nodes[thisNeighbor].cost = tmpNode.cost;
              nodes[thisNeighbor].scoreG = tmpNode.scoreG;
              nodes[thisNeighbor].scoreH = tmpNode.scoreH;
              nodes[thisNeighbor].scoreF = tmpNode.scoreF;
              nodes[thisNeighbor].status = tmpNode.status;
            }
          } else {
            //If neighbor is not already open
            nodes[thisNeighbor].status = NodeStatus.OPEN;
            nodes[thisNeighbor].parent = thisNode;
            this.computeScores(nodes, thisNeighbor, endIndex, allowDiag);
          }
        }
      }//end of check neighbors
    } //end of while loop

    //Path has been found if we are here
    //Work backwards to determine path
    var revPath = [];
    thisNode = endIndex;
    while (true) {
      revPath.push(thisNode);
      if (thisNode == startIndex) break;
      thisNode = nodes[thisNode].parent;
    }
    for (var i = 0; i < revPath.length; i++)
      path.push(revPath[(revPath.length - 1) - i]);

    return path;
  }
}


class Shape {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this._width = width;
    this._height = height;
  }

  width() { return this._width; }
  height() { return this._height; }
  at() { return new Vector(this.x, this.y); }

  move(x,y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    rect(this.x, this.y, this._width, this._height);
  }
}

class Rect extends Shape {
  constructor(x, y, width, height) {
    super(x, y, width, height);
  }

  doesCollide(rect2) {
    if (this.y > (rect2.y + rect2.height())) return false;
    if ((this.y + this.height()) < rect2.y) return false;
    if ((this.x > rect2.x + rect2.width())) return false;
    if ((this.x + this.width()) < rect2.x) return false;
    return true;
  }
}

class Ellipse extends Shape {
  constructor(x, y, width, height) {
    super(x, y, width, height);
  }
  draw() {
    ellipse(this.x, this.y, this.width(), this.height());
  }
}

class Circle extends Shape {
  constructor(x, y, radius) {
    super(x, y, radius * 2, radius * 2);
    this._radius = radius;
  }

  radius() { return this._radius; }

  draw() {
    ellipse(this.x, this.y, this.radius() * 2, this.radius() * 2);
  }

  doesCollide(circle2) {
    var centerDistance = this.at().dist(circle2.at());
    return (centerDistance <= (this.radius() + circle2.radius()));
  }
}

class Sprite {
  constructor(imgObj, tWidth, tHeight) {
    this._width = tWidth;
    this._height = tHeight;
    this.imageObject = imgObj;
    this.x = 0;
    this.y = 0;
    this.index = 0;
  }

  width() { return this._width; }
  height() { return this._height; }
  rows() { return (this.imageObject.height / this.height()); }
  columns() { return (this.imageObject.width / this.width()); }
  size() { return (this.rows() * this.columns()); }

  move(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(optDestWidth, optDestHeight) {
    if (this.index < 0 || this.index >= this.size()) return;
    var destWidth = (optDestWidth == null ? this.width() : optDestWidth);
    var destHeight = (optDestHeight == null ? this.height() : optDestHeight);

    var srcX = 0;
    var srcY = 0;
    if (this.index != 0) {
      srcX = (this.index % this.columns()) * this.width();
      srcY = Math.floor(this.index / this.columns()) * this.height();
    }

    var destX = this.x;
    var destY = this.y;
    image(this.imageObject, destX, destY, destWidth, destHeight,
      srcX, srcY, this.width(), this.height());
  }
}















//MESSY... FIX LATER (Font / PaintBrush)

class Font {
  constructor(fClr, sClr, sz) {
    this.fillClr = fClr;
    this.strokeClr = sClr;
    this.size = sz;
    this.fontName = "Consolas";
    this.style = NORMAL;
    this.strokeWeight = 1;
    this.alignHorizontal = LEFT;
    this.alignVertical = TOP;
  }
  apply(optObj) {
    if (optObj == null) {
      if (this.fillClr == null) {
        noFill();
      } else {
        fill(this.fillClr);
      }
      if (this.strokeClr == null) {
        noStroke();
      } else {
        stroke(this.strokeClr);
      }
      textSize(this.size);
      textFont(this.fontName);
      textStyle(this.style);
      strokeWeight(this.strokeWeight);
      textAlign(this.alignHorizontal, this.alignVertical);
    } else {
      if (this.fillClr == null) {
        optObj.noFill();
      } else {
        optObj.fill(this.fillClr);
      }
      if (this.strokeClr == null) {
        optObj.noStroke();
      } else {
        optObj.stroke(this.strokeClr);
      }
      optObj.textSize(this.size);
      optObj.textFont(this.fontName);
      optObj.textStyle(this.style);
      optObj.strokeWeight(this.strokeWeight);
      optObj.textAlign(this.alignHorizontal, this.alignVertical);
    }
  }
}

function write(str, x, y, optObj) {
  if (optObj == null) {
    text(str, x, y);
  } else {
    optObj.text(str,x,y);
  }
}

class PaintBrush {
  constructor(clr, sz) {
    this.size = (sz == null ? 12 : sz);
    this.fill = (clr == null ? Color.Black : clr);
    this.fontName = "Consolas";
    this.style = NORMAL;
    this.stroke = null;
    this.strokeWeight = 1;
    this.alignHorizontal = LEFT;
    this.alignVertical = TOP;
    this.apply();
  }

  update(optObj) {
    if (optObj == null) {
      textSize(this.size);
      fillStroke(this.fill, this.stroke);
      textFont(this.fontName);
      textStyle(this.style);
      strokeWeight(this.strokeWeight);
      textAlign(this.alignHorizontal, this.alignVertical);
    } else {
      optObj.textSize(this.size);
      optObj.fillStroke(this.fill, this.stroke);
      optObj.textFont(this.fontName);
      optObj.textStyle(this.style);
      optObj.strokeWeight(this.strokeWeight);
      optObj.textAlign(this.alignHorizontal, this.alignVertical);
    }
  }

  //Write text
  write(str, x, y) {
    this.apply();
    text(str, x, y);
  }

  //Paint a single pixel or lines connecting at least 2
  paint(args) {
    this.apply();
    var isStrokeNull;

    //Accepts vectors; individually or as an array
    if (arguments.length == 0) return;

    if (this.stroke == null && this.fill != null) {
      isStrokeNull = true;
      stroke(this.fill);
    }

    //If a single argument is supplied and it's
    //NOT an array, just paint the pixel
    if (arguments.length == 1 && args.length == undefined) {
      set(arguments[0].x, arguments[0].y, color(this.fill));
      updatePixels();
      return;
    }

    //Create a temporary array of all the vectors
    var v = [];
    for (var i = 0; i < arguments.length; i++) {
      if (arguments[i].length == undefined) {
        v.push(arguments[i]);
      } else {
        for (var j = 0; j < arguments[i].length; j++)
          v.push(arguments[i][j]);
      }
    }

    //Connect all the points in the array
    for (var i = 1; i < v.length; i++)
      line(v[i - 1].x, v[i - 1].y, v[i].x, v[i].y);

    if (isStrokeNull) noStroke();
  }

  //Draw a shape to the screen
  draw(shape) {
    this.apply();
    shape.draw();
  }
}

