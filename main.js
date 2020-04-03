let TileBitmaskID = {
  Top : 0, //Land or upper layer tile
  Base : 13, //Water or lower layer tile
  Side_E_W : 1,
  Side_N_S_W : 2,
  Side_N_E_S : 3,
  Side_N_E_W : 4,
  Side_N_Corner_SW : 5,
  Side_N_W : 6,
  Corner_NE_NW : 7,
  Side_N_E : 8,
  Side_N_E_S_W : 9,
  Side_E_S_W : 10,
  Side_N_Corner_SE : 11,
  Corner_SW_NW : 12,
  Corner_NE_SE : 14,
  Side_N_S : 15,
  Corner_SE : 16,
  Corner_SW : 17,
  Side_S_W : 18,
  Corner_SE_SW : 19,
  Side_E_S : 20,
  Side_S_Corner_NW : 21,
  Corner_NE : 22,
  Corner_NW : 23,
  Side_N_W_Corner_SE : 24,
  Side_N_Corner_SE_SW : 25,
  Side_N_E_Corner_SW : 26,
  Side_S_Corner_NE : 27,
  Side_N : 28,
  Side_E : 29,
  Side_W_Corner_NE_SE : 30,
  Corner_NE_SE_SW_NW : 31,
  Side_E_Corner_SW_NW : 32,
  Side_W_Corner_SE : 33,
  Side_S : 34,
  Side_W : 35,
  Side_S_W_Corner_NE : 36,
  Side_S_Corner_NE_NW : 37,
  Side_E_S_Corner_NW : 38,
  Side_W_Corner_NE : 39,
  Side_E_Corner_SW : 40,
  Side_E_Corner_NW : 41,
  Corner_NE_SW : 42,
  Corner_SE_NW : 43,
  Corner_NE_SE_NW : 44,
  Corner_NE_SW_NW : 45,
  Corner_SE_SW_NW : 46,
  Corner_NE_SE_SW : 47
}

let LAND = TileBitmaskID.Top;
let WATER = TileBitmaskID.Base;

class Tile {
  constructor() {
    this.isLand = false;
    this.bitmaskID = WATER;
  }
}

let grid;
let tileSheet;
let sheetGrid;
let sprTerrain;
let tiles = [];

function preload() {
  tileSheet = loadImage("tiles.png");
}

function setup() {
  createCanvas(800, 600);
  grid = new Grid(12,8, 32, 32);
  grid.x = 16;
  grid.y = 16;
  sprTerrain = new Sprite(tileSheet, 32, 32);
  sheetGrid = new Grid(6, 8, 32, 32);
  sheetGrid.x = 16;
  sheetGrid.y = 275;
  for (var i = 0; i < grid.size(); i++) {
    tiles[i] = new Tile();
  }
  textAlign(LEFT, TOP);
  textSize(12);
}

function draw() {
  background(255);
  for (var i = 0; i < grid.size(); i++) {
    sprTerrain.index = tiles[i].bitmaskID;
    sprTerrain.x = grid.cell(i).x;
    sprTerrain.y = grid.cell(i).y;
    sprTerrain.draw();
    noStroke();
    fill(0);
    text(tiles[i].bitmaskID, grid.cell(i).x + 10, grid.cell(i).y + 10);
  }
  image(tileSheet, 16, 275);
  for (var i = 0; i < sheetGrid.size(); i++) {
    stroke(0, 75);
    noFill();
    rect(sheetGrid.cell(i).x, sheetGrid.cell(i).y, 32, 32);
    fill(255);
    text(i, sheetGrid.cell(i).x, sheetGrid.cell(i).y);
  }
}

function mousePressed() {
  let cell = grid.cell(mouseX, mouseY);
  if (cell != null) tiles[cell.index].isLand = !tiles[cell.index].isLand;
  for (var i = 0; i < grid.size(); i++)
    tiles[i].bitmaskID = calculateBitmaskID(grid.cell(i));
}

function calculateBitmaskID(gridCell) {
  if (gridCell == null) return null;
  if (tiles[gridCell.index].isLand) return TileBitmaskID.Top;

  let id = 0;

  let north = grid.neighbor(gridCell, Direction.North);
  let east = grid.neighbor(gridCell, Direction.East);
  let south = grid.neighbor(gridCell, Direction.South);
  let west = grid.neighbor(gridCell, Direction.West);
  
  let nEast = grid.neighbor(gridCell, Direction.NorthEast);
  let sEast = grid.neighbor(gridCell, Direction.SouthEast);
  let nWest = grid.neighbor(gridCell, Direction.NorthWest);
  let sWest = grid.neighbor(gridCell, Direction.SouthWest);

  if (north != null && tiles[north.index].isLand) id += 1;
  if (east != null && tiles[east.index].isLand) id += 4;
  if (id == 0 && nEast != null && tiles[nEast.index].isLand) id +=2;

  if (south != null && tiles[south.index].isLand) id += 16;
  if (id < 4 && sEast != null && tiles[sEast.index].isLand) id += 8;

  if (west != null && tiles[west.index].isLand) id += 64;
  if (id < 16 && sWest != null && tiles[sWest.index].isLand) id += 32;

  if (north != null && !tiles[north.index].isLand &&
      west != null && !tiles[west.index].isLand &&
      nWest != null && tiles[nWest.index].isLand) id += 128;

  //48 possible ID's... see TileBitmaskID object.
  //Chance ID value to match the sprite index
  //in the terrain tile sheet image.
  let bmask = -1;
  if (id == 0) bmask = TileBitmaskID.Base;
  if (id == 1) bmask = TileBitmaskID.Side_N;
  if (id == 2) bmask = TileBitmaskID.Corner_NE;
  if (id == 4) bmask = TileBitmaskID.Side_E;
  if (id == 5) bmask = TileBitmaskID.Side_N_E;
  if (id == 8) bmask = TileBitmaskID.Corner_SE;
  if (id == 9) bmask = TileBitmaskID.Side_N_Corner_SE;
  if (id == 10) bmask = TileBitmaskID.Corner_NE_SE;
  if (id == 16) bmask = TileBitmaskID.Side_S;
  if (id == 17) bmask = TileBitmaskID.Side_N_S;
  if (id == 18) bmask = TileBitmaskID.Side_S_Corner_NE;
  if (id == 20) bmask = TileBitmaskID.Side_E_S;
  if (id == 21) bmask = TileBitmaskID.Side_N_E_S;
  if (id == 32) bmask = TileBitmaskID.Corner_SW;
  if (id == 33) bmask = TileBitmaskID.Side_N_Corner_SW;
  if (id == 34) bmask = TileBitmaskID.Corner_NE_SW;
  if (id == 36) bmask = TileBitmaskID.Side_E_Corner_SW;
  if (id == 37) bmask = TileBitmaskID.Side_N_E_Corner_SW;
  if (id == 40) bmask = TileBitmaskID.Corner_SE_SW;
  if (id == 41) bmask = TileBitmaskID.Side_N_Corner_SE_SW;
  if (id == 42) bmask = TileBitmaskID.Corner_NE_SE_SW;
  if (id == 64) bmask = TileBitmaskID.Side_W;
  if (id == 65) bmask = TileBitmaskID.Side_N_W;
  if (id == 66) bmask = TileBitmaskID.Side_W_Corner_NE;
  if (id == 68) bmask = TileBitmaskID.Side_E_W;
  if (id == 69) bmask = TileBitmaskID.Side_N_E_W;
  if (id == 72) bmask = TileBitmaskID.Side_W_Corner_SE;
  if (id == 73) bmask = TileBitmaskID.Side_N_W_Corner_SE;
  if (id == 74) bmask = TileBitmaskID.Side_W_Corner_NE_SE;
  if (id == 80) bmask = TileBitmaskID.Side_S_W;
  if (id == 81) bmask = TileBitmaskID.Side_N_S_W;
  if (id == 82) bmask = TileBitmaskID.Side_S_W_Corner_NE;
  if (id == 84) bmask = TileBitmaskID.Side_E_S_W;
  if (id == 85) bmask = TileBitmaskID.Side_N_E_S_W;
  if (id == 128) bmask = TileBitmaskID.Corner_NW;
  if (id == 130) bmask = TileBitmaskID.Corner_NE_NW;
  if (id == 132) bmask = TileBitmaskID.Side_E_Corner_NW;
  if (id == 136) bmask = TileBitmaskID.Corner_SE_NW;
  if (id == 138) bmask = TileBitmaskID.Corner_NE_SE_NW;
  if (id == 144) bmask = TileBitmaskID.Side_S_Corner_NW;
  if (id == 146) bmask = TileBitmaskID.Side_S_Corner_NE_NW;
  if (id == 148) bmask = TileBitmaskID.Side_E_S_Corner_NW;
  if (id == 160) bmask = TileBitmaskID.Corner_SW_NW;
  if (id == 162) bmask = TileBitmaskID.Corner_NE_SW_NW;
  if (id == 164) bmask = TileBitmaskID.Side_E_Corner_SW_NW;
  if (id == 168) bmask = TileBitmaskID.Corner_SE_SW_NW;
  if (id == 170) bmask = TileBitmaskID.Corner_NE_SE_SW_NW;
  return bmask;
}