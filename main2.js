class Tile {
  constructor() {
    this.bits = [0, 0, 0, 0];
  }
  dec() {
    return (this.bits[0] * 8 +
      this.bits[1] * 4 +
      this.bits[2] * 2 +
      this.bits[3]);
  }

  set(decValue) {
    this.bits[0] = floor(decValue / 8);
    decValue -= this.bits[0] * 8;
    this.bits[1] = floor(decValue / 4);
    decValue -= this.bits[1] * 4;
    this.bits[2] = floor(decValue / 2);
    decValue -= this.bits[2] * 2;
    this.bits[3] = decValue;
  }
}


let board;
let imgTerrain;
let imgGrid;
let sprTerrain;
let mapData = [];

let placeTile = 15;

function preload() {
  imgTerrain = loadImage("ground.png");
}

function setup() {
  createCanvas(800, 600);
  board = new Grid(8, 6, 32, 32);
  imgGrid = new Grid(16, 1, 32, 32);
  imgGrid.y = 200;
  sprTerrain = new Sprite(imgTerrain, 32, 32);
  for (var i = 0; i < board.size(); i++)
    mapData[i] = new Tile();
}

function draw() {
  background(255);
  for (var i = 0; i < board.size(); i++) {
    sprTerrain.x = board.cell(i).x;
    sprTerrain.y = board.cell(i).y;
    sprTerrain.index = mapData[i].dec() + 48;
    sprTerrain.draw();
  }

  image(imgTerrain, 0, 200);
  noFill();
  stroke(0,26);
  for (var i = 0; i < imgGrid.size(); i++)
    rect(imgGrid.cell(i).x, imgGrid.cell(i).y, 32,32);
}

function mousePressed() {
  var cell = board.cell(mouseX, mouseY);
  var n = null;
  var b1, b2;

  var addBit = 1;
  if (placeTile == 0) addBit = 0;
  

  if (cell != null) {
    mapData[cell.index].set(placeTile);

    for (var dir = 0; dir < 8; dir++) {
      n = board.neighbor(cell, dir);
      if (n != null) {
        switch (dir) {
          case (Direction.North): b1 = 2; b2 = 3; break;
          case (Direction.NorthEast): b1 = 2;  b2 = -1; break;
          case (Direction.East): b1 = 0;  b2 = 2;  break;
          case (Direction.SouthEast): b1 = 0;  b2 = -1; break;
          case (Direction.South): b1 = 0;  b2 = 1;  break;
          case (Direction.SouthWest): b1 = 1;  b2 = -1; break;
          case (Direction.West): b1 = 1;  b2 = 3;  break;
          case (Direction.NorthWest): b1 = 3;  b2 = -1; break;
        }
        mapData[n.index].bits[b1] = addBit;
        if (b2 != -1) mapData[n.index].bits[b2] = addBit;
      }
    }

  }
}

function keyPressed() {
  if (keyCode == 32) {
    placeTile = (placeTile == 15 ? 0 : 15);
  }
}