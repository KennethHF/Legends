/************************************************************************************
                            SIMPLE JAVASCRIPT GAME LIBRARY

The purpose of this file is provide an assortment of tools to aid in the development
of javascript game projects.  The p5.js library is required as many of the objects,
classes, and functions require this library to work. It can be found at:
https://p5.js.org

Version Dates:
29 Sep 2020 (2.0.0) : Finalized from previous version

File Summary:

-P5 Wrappers
  Graphic(w,h)
  Vector(x,y)

-Independent Functions
  disableMouseRightClick()
  disableCanvasDragDrop()
  increment(x1, y1, x2, y2, dst)
  chance(perc)
  format(num)

-Objects
  Color:
    Color.<Clr>
    Color.fromIndex(i)
    Color.random()
  Mouse:
    Mouse.x
    Mouse.y
    Mouse.update() - called in draw()
    Mouse.isPressed()
    Mouse.isReleased()
    Mouse.isHeld()

-P5 Required Independent Functions
  isColorEqual(clr1, clr2)
  makeTransparent(imgObj, replaceClr)
  generateNoise(cols, rws, incr = 0.2)
  drawDashLine(x1,y1, x2,y2, segmentLen, optDest)

-Classes
  Timer(callFunc, milliPerTick)
    start()
    stop()
    isStopped()
    reset()
    ticks()
  Graph()
    addNodes(...args)
    addEdges(n, ...allEdges)
    getEdges(n)
    isEdge(n1, n2)
    isNode(n)
    toString()
  Hash(optKeyArray)
    get(key)
    set(key, val)
    getValue(key)
    size()
    clear()
    toString()
  Rectangle(x, y, w, h)
    width()
    height()
    at()
    move(x, y)
    resize(w, h)
    collides(rect2)
    contains(x, y)
    draw(optGraphic)
  Surface(w, h) : Rectangle(0, 0, w, h)
    graphic() Returns graphic Object
    show()
    hide()
    isVisible()
    fill(clr)
    stroke(clr)
    background(clr)
    noFill()
    noStroke()
    clear()
    image(img, x, y)
    draw(optGraphic)
    isMouseOver()
  Sprite(imgObj, tileW, tileH)
    width()
    height()
    at()
    rows()
    columns()
    size()
    move(x, y)
    resize(w, h)
    draw(optDestObj, optDestW, optDestH)




  Circle
  HexGrid
  Grid
  pathfinder?


************************************************************************************
P5 References:

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

 if mouseButton == LEFT
 mouseIsPressed
 mouseX
 mouseY

 keyCode
 key
 keyIsPressed
 if keyIsDown(LEFT_ARROW)

************************************************************************************/

"use strict";

//P5 WRAPPERS ***********************************************************************


function Graphic(w, h) { return createGraphics(w,h); }
function Vector(x, y) { return createVector(x, y); }


//***********************************************************************************
//INDEPENDENT FUNCTIONS (NOT DEPENDENT ON P5 LIBRARY) *******************************


function disableMouseRightClick() {
  document.addEventListener("contextmenu", function(e){
     e.preventDefault();
  }, false);
}
function disableRightClick() { disableMouseRightClick(); }


function disableCanvasDragDrop() {
  document.body.setAttribute("ondragstart", "return false;");
  document.body.setAttribute("ondrop", "return false;");
}


function increment(x1, y1, x2, y2, dst) {
  let d = Math.sqrt( ((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)) );
  let t = dst/d;
  if (t < 0) return {x:x1, y:y1};
  if (t > 1) return {x:x2, y:y2};
  let nX = ((1-t) * x1) + (t * x2);
  let nY = ((1-t) * y1) + (t * y2);
  return {x:nX, y:nY};
}


function chance(perc) {
  if (perc >= 100) return true;
  if (perc <= 0) return false;
  let c = Math.floor(Math.random() * 100) + 1;
  return (c <= perc);
}


function format(num) {
 //Parameter Example: 34421; Returns: "34,421"
 return String(num).replace(/(.)(?=(\d{3})+$)/g,'$1,');
}


//***********************************************************************************
//COLOR *****************************************************************************


let Color = {
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
  Black: "#000000",
  Brown: "#654321",

  fromIndex: function(index) {
    let clr = null;
    switch (index) {
      case (0): clr = Color.Red; break;
      case (1): clr = Color.Maroon; break;
      case (2): clr = Color.Crimson; break;
      case (3): clr = Color.Salmon; break;
      case (4): clr = Color.Pink; break;
      case (5): clr = Color.HotPink; break;
      case (6): clr = Color.Orange; break;
      case (7): clr = Color.DarkOrange; break;
      case (8): clr = Color.Gold; break;
      case (9): clr = Color.Yellow; break;
      case (10): clr = Color.LightYellow; break;
      case (11): clr = Color.Manilla; break;
      case (12): clr = Color.Khaki; break;
      case (13): clr = Color.Lavender; break;
      case (14): clr = Color.Violet; break;
      case (15): clr = Color.Magenta; break;
      case (16): clr = Color.DarkMagenta; break;
      case (17): clr = Color.Purple; break;
      case (18): clr = Color.Lime; break;
      case (19): clr = Color.SeaGreen; break;
      case (20): clr = Color.Green; break;
      case (21): clr = Color.DarkGreen; break;
      case (22): clr = Color.Olive; break;
      case (23): clr = Color.Teal; break;
      case (24): clr = Color.Aqua; break;
      case (25): clr = Color.Cyan; break;
      case (26): clr = Color.LightCyan; break;
      case (27): clr = Color.Turquoise; break;
      case (28): clr = Color.LightBlue; break;
      case (29): clr = Color.SkyBlue; break;
      case (30): clr = Color.Blue; break;
      case (31): clr = Color.DarkBlue; break;
      case (32): clr = Color.Navy; break;
      case (33): clr = Color.Bisque; break;
      case (34): clr = Color.Wheat; break;
      case (35): clr = Color.Tan; break;
      case (36): clr = Color.Snow; break;
      case (37): clr = Color.MintCream; break;
      case (38): clr = Color.Seashell; break;
      case (39): clr = Color.Ivory; break;
      case (40): clr = Color.Gray; break;
      case (41): clr = Color.LightGray; break;
      case (42): clr = Color.DarkGray; break;
      case (43): clr = Color.White; break;
      case (44): clr = Color.Black; break;
      case (45): clr = Color.Brown; break;
      default: clr = Color.Black; break;
    }
    return clr;
  },

  random: function() {
    let r = floor(random(256));
    let g = floor(random(256));
    let b = floor(random(256));
    return color(r, g, b);
  }
};


const MOUSE_STATE_INACTIVE = 0;
const MOUSE_STATE_PRESS  = 1;
const MOUSE_STATE_HELD = 2;
const MOUSE_STATE_RELEASE = 3;

let Mouse = {
  x : 0,
  y : 0,
  state : MOUSE_STATE_INACTIVE,
  
  isPressed : function() { return this.state == MOUSE_STATE_PRESS; },
  isReleased : function() { return this.state == MOUSE_STATE_RELEASE; },
  isHeld : function() { return this.state == MOUSE_STATE_HELD; },

  update : function() {
    this.x = mouseX;
    this.y = mouseY;

    if (mouseIsPressed && this.state == MOUSE_STATE_PRESS)
      this.state = MOUSE_STATE_HELD;

    if (mouseIsPressed && this.state == MOUSE_STATE_INACTIVE)
      this.state = MOUSE_STATE_PRESS;

    if (!mouseIsPressed && this.state == MOUSE_STATE_RELEASE)
      this.state = MOUSE_STATE_INACTIVE;

    if (!mouseIsPressed && this.state == MOUSE_STATE_HELD)
      this.state = MOUSE_STATE_RELEASE;
  },

  toString : function(isStateStr) {
    if (isStateStr == true) {
      if (this.isPressed()) return "Pressed";
      if (this.isReleased()) return "Released";
      if (this.isHeld()) return "Held";
      return "Inactive";
    }
    return (this.x + ", " + this.y);
  }
};


//***********************************************************************************
//P5 REQUIRED INDEPENDENT FUNCTIONS *************************************************


function isColorEqual(clr1, clr2) {
  return ((red(clr1) == red(clr2)) &&
          (green(clr1) == green(clr2)) &&
          (blue(clr1) == blue(clr2)) &&
          (alpha(clr1) == alpha(clr2)));
}


function makeTransparent(imgObj, replaceClr) {
 //Changes the parameter color of the parameter image transparent
 imgObj.loadPixels();
 for (let x = 0; x < imgObj.width; x++) {
   for (let y = 0; y < imgObj.height; y++) {
     let tmpClr = imgObj.get(x, y);
     if (isColorEqual(tmpClr, replaceClr)) imgObj.set(x, y, color(0,0));
   }
 }
 imgObj.updatePixels();
}


function generateNoise(columns, rows, incr = 0.2) {
  //Returns an array of perlin noise values
  //Ranges between 0.0 and 1.0
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


function drawDashLine(x1,y1, x2,y2, segmentLen, optDest) {
  if (segmentLen == null) segmentLen = dist(x1,y1, x2,y2);
  if (segmentLen <= 0) return;

  let v1 = {x:x1, y:y1};
  let v2 = {x:x2, y:y2};
  let thisPoint = v1;
  let nextPoint = 0;
  let dashCount = dist(v1.x,v1.y, v2.x,v2.y) / segmentLen;
  
  for (let i = 0; i < dashCount; i++) {
    nextPoint = increment(thisPoint.x, thisPoint.y, v2.x, v2.y, segmentLen);
    if (i % 2 == 0) {
      if (segmentLen > 1) {
        if (optDest == null) line(thisPoint.x, thisPoint.y, nextPoint.x, nextPoint.y);
        if (optDest != null) optDest.line(thisPoint.x, thisPoint.y, nextPoint.x, nextPoint.y);
      }
      if (segmentLen == 1) {
        if (optDest == null) point(thisPoint.x, thisPoint.y);
	if (optDest != null) optDest.point(thisPoint.x, thisPoint.y);
      }
    }
    thisPoint = nextPoint;
  }

  if (optDest == null) point(v2.x, v2.y);
  if (optDest != null) optDest.point(v2.x, v2.y);
}


//***********************************************************************************
//CLASSES ***************************************************************************


class Timer {
  constructor(callFunction, millisecondsPerTick) {
    this.tickRate = (millisecondsPerTick == null ? 500 : millisecondsPerTick);
    this.funct = (callFunction == null ? this.emptyLoop : callFunction);
    this.counter = 0;
    this.clock = null;
    this.paused = true;
  }

  ticks() { return this.counter; }
  reset() { this.counter = 0; }
  
  start() {
    this.clock = window.setInterval(this.tLoop.bind(this), this.tickRate);
    this.paused = false;
  }

  stop() {
    window.clearInterval(this.clock);
    this.paused = true;
  }

  isStopped() { return this.paused; }

  tLoop() { 
    this.counter++; 
    this.funct(); 
  }
  
  emptyLoop(){};
}


class Graph {
  constructor() {
    this.nodes = [];
    this.edges = [];
    this._n = 0;
  }

  addNodes(...args) {
    for (let a of args)
      this.nodes.push(a);
  }

  addEdges(n, ...allEdges) {
    if (!this.isNode(n)) return;
    for (let e of allEdges) {
      if (!this.isEdge(n, e)) this.edges.push({n, e});
    }
  }

  getEdges(n) {
    let nodeEdges = [];
    for (let edge of this.edges) {
      if (edge.n == n && edge.e != n) nodeEdges.push(edge.e);
      if (edge.e == n && edge.n != n) nodeEdges.push(edge.n);
    }
    return nodeEdges;
  }

  isEdge(n1, n2) {
    if (n1 == n2) return false;
    for (let edge of this.edges)
      if ((edge.n == n1 && edge.e == n2) || (edge.n == n2 && edge.e == n1)) return true;
    return false;
  }

  isNode(n1) {
    for (let n of this.nodes)
      if (n == n1) return true;
    return false; 
  }

  [Symbol.iterator]() { 
    var itor = -1;

    return {
      next: () => ({ value:this.nodes[++itor], done: !(itor in this.nodes) })
    };
  }

  next() {
    if (this._n < this.nodes.length) {
      this._n++;
      return {done:false, value:this.nodes[this._n]};   
    } else {
      this._n = 0;
      return {done:true};
    }
  }

  toString() {
    let str = "";
    for (let n of this) {
      let edges = this.getEdges(n);
      if (edges.length == 0) edges = "no edges";
      str += n + " => " + edges + "\n";
    }
    return str;
  }

}


class Hash {
  constructor(optKeyArray) {
    this.list = [];
    if (optKeyArray == null) return;
    for (let keyAttr of optKeyArray)
      this.list.push({key:keyAttr, value:null});
  }

  get(key) {
    for (let data of this.list)
      if (data.key.toUpperCase() == key.toUpperCase()) return data;
  }

  set(key, val) {
    for (let data of this.list) {
      if (data.key.toUpperCase() == key.toUpperCase()) {
        data.value = val;
        return;
      }
    }
    this.list.push({key:key, value:val});
  }

  getValue(key) {
    for (let data of this.list)
      if (data.key.toUpperCase() == key.toUpperCase()) return data.value;
  }

  size() { return this.list.length; }
  clear() { this.list = []; }

  toString() {
    let str = "";
    let count = 0;
    for (let data of this.list) {
      str += "[" + count + "] Key: " + data.key + ", Value: " + data.value + "\n";
      count++;
    }
    return str;
  }
}


class Rectangle {
  constructor(x, y, w, h) {
    this.move(x, y);
    this.resize(w, h);
  }

  width() { return this._width; }
  height() { return this._height; }
  at() { return new Vector(this.x, this.y); }

  move(x, y) {
    this.x = x;
    this.y = y;
  }

  resize(w, h) {
    this._width = w;
    this._height = h;
  }

  collides(rect2) {
    if (this.at().y > (rect2.at().y + rect2.height())) return false;
    if ((this.at().y + this.height()) < rect2.at().y) return false;
    if ((this.at().x > rect2.at().x + rect2.width())) return false;
    if ((this.at().x + this.width()) < rect2.at().x) return false;
    return true;
  }

  contains(x, y) {
    let r = new Rectangle(x, y, 1, 1);
    return this.collides(r);
  }

  draw(optGraphic) {
    if (optGraphic == null) {
      rect(this.x, this.y, this._width, this._height);
    } else {
      optGraphic.rect(this.x, this.y, this._width, this._height);
    }
  }
}


class Surface extends Rectangle {
  constructor(w, h) {
    super(0, 0, w, h);
    this.gfx = new Graphic(w, h);
    this.visible = true;
  }

  show() { this.visible = true; }
  hide() { this.visible = false; }
  isVisible() { return this.visible; }
  graphic() { return this.gfx; }

  //GRAPHIC FUNCTIONS
  fill(clr) { this.gfx.fill(clr); }
  stroke(clr) { this.gfx.stroke(clr); }
  noFill() { this.gfx.noFill(); }
  noStroke() { this.gfx.noStroke(); }
  image(img, x, y) { this.gfx.image(img, x, y); }
  background(clr) { this.gfx.background(clr); }
  clear() { this.gfx.clear(); }
  rect(x, y, w, h) { this.gfx.rect(x, y, w, h); }

  isMouseOver() { return this.contains(mouseX, mouseY); }

  draw(optGraphic) {
   if (!this.isVisible()) return;
    if (optGraphic == null) {
      image(this.gfx, this.x, this.y);
    } else {
      optGraphic.image(this.gfx, this.x, this.y);
    }
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
    this.destWidth = tWidth;
    this.destHeight = tHeight;
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

  resize(w, h) {
    this.destWidth = w;
    this.destHeight = h;
  }

  draw(optDestObj, optDestWidth, optDestHeight) {
    if (this.index < 0 || this.index >= this.size()) return;
    var dWidth = (optDestWidth == null ? this.destWidth : optDestWidth);
    var dHeight = (optDestHeight == null ? this.destHeight : optDestHeight);

    var srcX = 0;
    var srcY = 0;
    if (this.index != 0) {
      srcX = (this.index % this.columns()) * this.width();
      srcY = Math.floor(this.index / this.columns()) * this.height();
    }

    var destX = this.x;
    var destY = this.y;
    if (optDestObj != null) {
      optDestObj.image(this.imageObject, destX, destY, dWidth, dHeight,
      srcX, srcY, this.width(), this.height());
    } else {
      image(this.imageObject, destX, destY, dWidth, dHeight,
      srcX, srcY, this.width(), this.height());
    }
  }
}


//**********************************************************************

//**********************************************************************

//**********************************************************************

//**********************************************************************

// STILL TO BE UPDATED BELOW *******************************************

//**********************************************************************

//**********************************************************************

//**********************************************************************
let Direction = {
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


class HexGrid {
 constructor(col, rw, radius) {
   this._radius = radius;
   this._columns = col;
   this._rows = rw;
   this.x = 0;
   this.y = 0;
 }

 //GETTERS
 at()      { return new Vector(this.x, this.y); }
 columns() { return this._columns; }
 rows()    { return this._rows; }
 radius()  { return this._radius; }
 size()    { return (this._columns * this._rows); }
 cellWidth()   { return (this._radius * 2); }
 cellHeight()  { return (sqrt(3) * this._radius); }

 width() {
   let evenColumnsWidth = floor((this.columns() / 2) + 0.5) * (this.cellWidth());
   let oddColumnsWidth = this.radius() * floor(this.columns() / 2);
   if (this.columns() % 2 == 0) oddColumnsWidth += (this.radius() / 2);
   return (evenColumnsWidth + oddColumnsWidth);
 }
 height() {
   let evenColumnsHeight = (this.cellHeight() * this.rows());
   if (this.columns() > 1) evenColumnsHeight += (this.cellHeight() / 2);
   return evenColumnsHeight;
 }

 getBorderPoints() {
  let pts = [];
   //Add TOP points
   for (let i = 0; i < this.columns(); i++) {
     pts.push(this.cell(i).points[4]);
     pts.push(this.cell(i).points[5]);
   }
   //Add RIGHT SIDE points
   for (let i = this.columns() - 1; i < this.size(); i+=this.columns()) {
     pts.push(this.cell(i).points[0]);
     pts.push(this.cell(i).points[1]);
     if (i == (this.size() - 1)) pts.push(this.cell(i).points[2]);
   }
   //Add BOTTOM points
   for (let i = this.size() - 2; i >= (this.size() - this.columns()); i--) {
     pts.push(this.cell(i).points[1]);
     pts.push(this.cell(i).points[2]);
   }
   //Add LEFT SIDE points
   for (let i = (this.size() - this.columns()); i >= 0; i-=this.columns()) {
     pts.push(this.cell(i).points[3]);
     if (i != 0) pts.push(this.cell(i).points[4]);
   }
  return pts;
 }
 

 //RETURNS A HEXAGON OBJECT WITH PROPERTIES
 hex(xOrIndex, optionalY) {
   if (arguments.length < 1 || arguments.length > 2) return null;
   if (arguments[0] == null) return null;

   //THIS OBJECT IS RETURNED IF VALID COORDINATES/INDEX PARAMETER
   let h = {
     x: 0,
     y: 0,
     index: null,
     column: null,
     row: null,
     cube: {x:0, y:0, z:0}, 
     width: this.cellWidth(),
     height: this.cellHeight(),
     points: []
   }
   

   //SET EITHER THE INDEX OR COORDINATES ON THE GRID
   if (arguments.length == 1) {
     if (arguments[0] < 0 || arguments[0] >= this.size()) return null;
     h.index = arguments[0];
   } else {
     if (arguments[0] < this.x || arguments[0] >= this.x + this.width()) return null;
     if (arguments[1] < this.y || arguments[1] >= this.y + this.height()) return null;
     h.x = arguments[0];
     h.y = arguments[1];
   }

   //CALCUALTE THE REMAINING HEXAGON OBJECT PROPERTY VALUES
   if (h.index != null) {

     //WE HAVE THE INDEX; CALCULATE REST
     h.column = h.index % this.columns();
     h.row = floor(h.index / this.columns());
     h.x = this.x + ((h.width / 2) + (h.width * 0.75 * h.column));
     h.y = this.y + ((h.height / 2) + (h.height * h.row));
     if (h.column % 2 != 0) h.y += (h.height / 2);
     h.cube.x = h.column;
     h.cube.z = h.row - (h.column - (h.column % 2)) / 2;
     h.cube.y = -h.cube.x-h.cube.z;

   } else {

     //WE HAVE AN X,Y COORDINATE; CALCULATE REST
     let col = (2/3 * (h.x - this.radius() - this.x)) / this.radius();
     let row = (-1/3 * (h.x - this.radius() - this.x) + sqrt(3)/3 * (h.y - (h.height/2) - this.y)) / this.radius();
     let rx = round(col);
     let ry = round(-col-row);
     let rz = round(row);

     let x_dff = abs(rx - col);
     let y_dff = abs(ry - (-col-row));
     let z_dff = abs(rz - row);

     if (x_dff > y_dff && x_dff > z_dff) {
       rx = -ry-rz;
     } else if (y_dff > z_dff) {
       ry = -rx-rz;
     } else {
       rz = -rx-ry;
     }   

     h.column = rx;
     if (h.column < 0 || h.column >= this.columns()) return null;

     h.row = rz + (rx - (rx % 2)) / 2;
     if (h.row < 0 || h.row >= this.rows()) return null;

     h.x = this.x + ((h.width / 2) + (h.width * 0.75 * h.column));
     h.y = this.y + ((h.height / 2) + (h.height * h.row));
     h.index = h.row * this.columns() + h.column;
     if (h.column % 2 != 0) h.y += (h.height / 2);
     h.cube.x = h.column;
     h.cube.z = h.row - (h.column - (h.column % 2)) / 2;
     h.cube.y = -h.cube.x-h.cube.z;
   }

   //CALCUATE THE 6 POINTS OF THE HEXAGON
   for (let v = 0; v < 6; v++) {
     let angleDegree = 60 * v;
     let angleRad = PI / 180 * angleDegree;
     h.points.push(new Vector(h.x + this.radius() * cos(angleRad),
                              h.y + this.radius() * sin(angleRad)));
   }


   //if (h.index < 0 || h.index >= this.size()) return null;
   return h;
 }

 cell(xOrIndex, optionalY) {
  if (arguments.length == 1) {
    return this.hex(xOrIndex); 
  } else {
    return this.hex(xOrIndex, optionalY);
  }
 }


 //DRAW SINGLE HEX
 drawHex(hexObject, optDest) {
   if (optDest != null) {
     optDest.beginShape();
     for (let i = 0; i < 6; i++)
       optDest.vertex(hexObject.points[i].x, hexObject.points[i].y);
     optDest.endShape(CLOSE);
   } else {
     beginShape();
     for (let i = 0; i < 6; i++)
       vertex(hexObject.points[i].x, hexObject.points[i].y);
     endShape(CLOSE);
   }
 }


 //DRAW ENTIRE GRID
 draw() {
   for (let i = 0; i < this.size(); i++)
     this.drawHex(this.hex(i));
 }

}



/*************************************************
EVERYTHING BELOW THIS LINE IS FOR THE GRID CLASS
*************************************************/

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

  move(x, y) {
    this.x = x;
    this.y = y;
  }

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
      points: [],
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
    c.points.push(new Vector(c.x, c.y));
    c.points.push(new Vector(c.x + c.width, c.y));
    c.points.push(new Vector(c.x + c.width, c.y + c.height));
    c.points.push(new Vector(c.x, c.y + c.height));
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

  draw() {
   for (let i = 0; i < this.size(); i++)
     rect(this.cell(i).x, this.cell(i).y, this.cellWidth(), this.cellHeight());
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

    if (startIndex < 0 || startIndex >= this.size()) return null;
    if (endIndex < 0 || endIndex >= this.size()) return null;

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
      if (thisNode == null) return null;

      nodes[thisNode].status = NodeStatus.CLOSED;
      if (thisNode == endIndex) break;

      //Check neighbors
      for (var n = 0; n < neighborCount; n++) {
        thisNeighbor = this.neighbor(this.cell(thisNode), n);
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


class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.rad = r;
  }

  radius() { return this.rad; }
  center() { return new Vector(this.x, this.y); }

  //Returns a point on the circumference of the circle
  //at a specified (parameter) degree between 0 - 360
  point(degree) {
    let x = this.x + (this.radius() * cos(radians(degree)));
    let y = this.y + (this.radius() * sin(radians(degree)));
    return new Vector(x, y);
  }

  //Calculates a line between the circle center and the
  //parameter points and returns the radians it passes through
  //along the circle's circumference
  rads(x, y) {
   return atan2(y - this.y, x - this.x);
  }

  contains(x, y) {
    let centerDist = dist(this.x, this.y, x, y);
    return (centerDist <= this.radius());
  } 

  collides(circle2) {
    let centerDist = dist(this.x, this.y, circle2.center().x, circle2.center().y);
    return (centerDist <= (this.radius() + circle2.radius()));
  }
  
  draw(optGraphic) {
    if (optGraphic == null) {
      ellipse(this.x, this.y, this.radius()*2, this.radius()*2);
    } else {
      optGraphic.ellipse(this.x, this.y, this.radius()*2, this.radius()*2);
    }
  }
}
