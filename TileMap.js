/* TILEMAP INTERFACE

  Public:
  Inherits Grid methods
  constructor(mapArray, Sprite); mapArray of 0's for water, 1's for land / Sprite object for tilesheet
  terrain(index); returns Tile object
  resizeCamera(width, height); visible area of the map
  positionCamera(x,y); sets the upper left corner (x,y) of visible area of map
  centerCamera(x,y); centers the visible area at x,y
  moveCamera(Direction, pixelAmount);
  draw(x, y); draws the visible area of the map at the x,y coordinates


  Utility (not meant to be called by end-user):
  buildSpriteSheet();
  redrawDisplay();
  getEdgeValue();
  getImageID();

*/

//An indepedent object defining all the 
//properties of a single tile used in a
//tile-based grid game (defined within TileMap)
class Tile {
 constructor() {
   this.elevation = 0;
   this.isLand = true;
   this.biome = 0;
   this.description = "Land tile";
   this.name = "Land";
   this.imageID = 0;
   this.fillClr = 0;
   this.moveCost = 0;
   this.isShaded = false;
 }
}


class TileMap extends Grid {

 constructor(mapDataArray, tilesSprite) {
   super(mapDataArray[0], 
         mapDataArray[1], 
	 mapDataArray[2], 
         mapDataArray[3]);

   this.LAND_CLR = color(0, 175, 0);
   this.WATER_CLR = color(0, 0, 175);

   //Create and initialize the tile data (Tile objects)
   this._tile = [];
   for (var i = 4; i < mapDataArray.length; i++) {
     this._tile.push(new Tile());
     var index = this._tile.length - 1;
     this._tile[index].fillClr = this.LAND_CLR;
     if (mapDataArray[i] == 0) {
       this._tile[index].isLand = false;
       this._tile[index].name = "Water";
       this._tile[index].description = "Water tile";
       this._tile[index].fillClr = this.WATER_CLR;
     }
   }

   //Determine the imageID based on land/water borders
   for (var i = 0; i < this.size(); i++) {
     var eValue = this.getEdgeValue(i);
     this.terrain(i).imageID = this.getImageID(eValue);
   }

   //Load or create the sprite sheet
   this.tSpr = tilesSprite;
   if (this.tSpr == null) this.tSpr = this.buildSpriteSheet();

   //Draw the map to the buffer  
   this.graphicBuffer = new Graphic(this.width(), this.height());
   this.graphicBuffer.noStroke();
   for (var i = 0; i < this.size(); i++) {
     this.tSpr.index = this.terrain(i).imageID;
     this.tSpr.x = this.cell(i).x;
     this.tSpr.y = this.cell(i).y;
     this.tSpr.draw(this.cellWidth(), this.cellHeight(), this.graphicBuffer);
     
     //this.graphicBuffer.fill(this.terrain(i).fillClr);
     this.graphicBuffer.fill(0,0,0,0);
     this.graphicBuffer.rect(this.cell(i).x, this.cell(i).y, this.cellWidth(), this.cellHeight());
     this.graphicBuffer.text(this.terrain(i).imageID, this.cell(i).x, this.cell(i).y);
   }

   this.cameraView = {
     x : 0,
     y : 0,
     width : 0,
     height : 0
   }
   this.resizeCamera(800, 600);
 }

 terrain(index) {
   return this._tile[index];
 }

 positionCamera(x, y) {
   this.cameraView.x = x;
   this.cameraView.y = y;
   this.redrawDisplay();  
 }

 centerCamera(x, y) {
   positionCamera(x - (this.cameraView.width / 2),
                  y - (this.cameraView.height / 2));
 }

 moveCamera(dir, amount) {
  switch (dir) {
    case (Direction.North):
      this.positionCamera(this.cameraView.x, this.cameraView.y - amount);
      break;
    case (Direction.South):
      this.positionCamera(this.cameraView.x, this.cameraView.y + amount);
      break;
    case (Direction.East):
      this.positionCamera(this.cameraView.x + amount, this.cameraView.y);
      break;
    case (Direction.West):
      this.positionCamera(this.cameraView.x - amount, this.cameraView.y);
      break;
    case (Direction.NorthEast):
      this.positionCamera(this.cameraView.x + amount, this.cameraView.y - amount);
      break;
    case (Direction.NorthWest):
      this.positionCamera(this.cameraView.x - amount, this.cameraView.y - amount);
      break;
    case (Direction.SouthEast):
      this.positionCamera(this.cameraView.x + amount, this.cameraView.y + amount);
      break;
    case (Direction.SouthWest):
      this.positionCamera(this.cameraView.x - amount, this.cameraView.y + amount);
      break;
  }
 }

 resizeCamera(w, h) {
   this.cameraView.width = w;
   this.cameraView.height = h;
   this.redrawDisplay();
 }



 redrawDisplay() {
  if (this.cameraView.width > this.graphicBuffer.width)
    this.cameraView.width = this.graphicBuffer.width;
  if (this.cameraView.height > this.graphicBuffer.height)
    this.cameraView.height = this.graphicBuffer.height;

  if (this.cameraView.x < 0) this.cameraView.x = 0;
  if (this.cameraView.y < 0) this.cameraView.y = 0;

  if (this.cameraView.x > (this.graphicBuffer.width - this.cameraView.width))
    this.cameraView.x = (this.graphicBuffer.width - this.cameraView.width);
  if (this.cameraView.y > (this.graphicBuffer.height - this.cameraView.height))
    this.cameraView.y = (this.graphicBuffer.height - this.cameraView.height);

  this.displayBuffer = new Graphic(this.cameraView.width, this.cameraView.height);
  this.displayBuffer.image(this.graphicBuffer, 0, 0, this.cameraView.width, this.cameraView.height,
                this.cameraView.x, this.cameraView.y, this.cameraView.width, this.cameraView.height);
 }

 draw(x = 0, y = 0) {
  image(this.displayBuffer, x, y);
 }

 buildSpriteSheet() {
  //Creates a 6x8 tile sprite sheet,
  //size 32x32 pixels
  var sprSheet = new Graphic(6 * 32, 8 * 32);
  sprSheet.background(this.WATER_CLR);
  var gAlign = new Grid(6, 8, 32, 32);

  //Create each tile in accordance with the 
  //edge correction function below
  sprSheet.noStroke();
  sprSheet.fill(this.LAND_CLR);
  rect(0, 0, 32, 32);
  
  
  return sprSheet;
 }

 getEdgeValue(index) {
  if (this.terrain(index).isLand) return -1;
  if (!this.terrain(index).isLand) {
    //Get neighboring cells
    var n = [0,0,0,0,0,0,0,0];
    for (var dir = 0; dir < 8; dir++) {
      var cell = null;
      if (dir == 0) cell = this.neighbor(this.cell(index), Direction.North);
      if (dir == 1) cell = this.neighbor(this.cell(index), Direction.NorthEast);
      if (dir == 2) cell = this.neighbor(this.cell(index), Direction.East);
      if (dir == 3) cell = this.neighbor(this.cell(index), Direction.SouthEast);
      if (dir == 4) cell = this.neighbor(this.cell(index), Direction.South);
      if (dir == 5) cell = this.neighbor(this.cell(index), Direction.SouthWest);
      if (dir == 6) cell = this.neighbor(this.cell(index), Direction.West);
      if (dir == 7) cell = this.neighbor(this.cell(index), Direction.NorthWest);
      if (cell != null && this.terrain(cell.index).isLand) n[dir] = 1;
    }

   var val = 0;
   if (n[0] == 1) val = 1;
   if (n[1] == 1) val += 2;
   if (n[2] == 1) val += 4;
   if (n[3] == 1) val += 8;
   if (n[4] == 1) val += 16;
   if (n[5] == 1) val += 32;
   if (n[6] == 1) val += 64;
   if (n[7] == 1) val += 128;

   return val;
  } 
 }

 getImageID(edgeVal) {
  var nb = 0;
  switch (edgeVal) {
    case -1: nb = 0; break;
    case 1: nb = 28; break;
    case 2: nb = 22; break;
    case 3: nb = 28; break;
    case 4: nb = 29; break;
    case 5: nb = 8; break;
    case 6: nb = 29; break;
    case 7: nb = 8; break;
    case 8: nb = 16; break;
    case 9: nb = 11; break;
    case 10: nb = 14; break;
    case 11: nb = 11; break;
    case 12: nb = 29; break;
    case 13: nb = 8; break;
    case 14: nb = 29; break;
    case 15: nb = 8; break;
    case 16: nb = 34; break;
    case 17: nb = 15; break;
    case 18: nb = 27; break;
    case 19: nb = 15; break;
    case 20: nb = 20; break;
    case 21: nb = 3; break;
    case 22: nb = 20; break;
    case 23: nb = 3; break;
    case 24: nb = 34; break;
    case 25: nb = 15; break;
    case 26: nb = 27; break;
    case 27: nb = 15; break;
    case 28: nb = 20; break;
    case 29: nb = 3; break;
    case 30: nb = 20; break;
    case 31: nb = 3; break;
    case 32: nb = 17; break;
    case 33: nb = 5; break;
    case 34: nb = 42; break;
    case 35: nb = 5; break;
    case 36: nb = 40; break;
    case 37: nb = 26; break;
    case 38: nb = 40; break;
    case 39: nb = 26; break;
    case 40: nb = 19; break;
    case 41: nb = 25; break;
    case 42: nb = 47; break;
    case 43: nb = 25; break;
    case 44: nb = 40; break;
    case 45: nb = 26; break;
    case 46: nb = 40; break;
    case 47: nb = 26; break;
    case 48: nb = 34; break;
    case 49: nb = 15; break;
    case 50: nb = 27; break;
    case 51: nb = 15; break;
    case 52: nb = 20; break;
    case 53: nb = 3; break;
    case 54: nb = 20; break;
    case 55: nb = 3; break;
    case 56: nb = 34; break;
    case 57: nb = 15; break;
    case 58: nb = 27; break;
    case 59: nb = 15; break;
    case 60: nb = 20; break;
    case 61: nb = 3; break;
    case 62: nb = 20; break;
    case 63: nb = 3; break;
    case 64: nb = 35; break;
    case 65: nb = 6; break;
    case 66: nb = 39; break;
    case 67: nb = 6; break;
    case 68: nb = 1; break;
    case 69: nb = 4; break;
    case 70: nb = 1; break;
    case 71: nb = 4; break;
    case 72: nb = 33; break;
    case 73: nb = 24; break;
    case 74: nb = 39; break;
    case 75: nb = 24; break;
    case 76: nb = 1; break;
    case 77: nb = 4; break;
    case 78: nb = 1; break;
    case 79: nb = 4; break;
    case 80: nb = 18; break;
    case 81: nb = 2; break;
    case 82: nb = 36; break;
    case 83: nb = 2; break;
    case 84: nb = 10; break;
    case 85: nb = 9; break;
    case 86: nb = 10; break;
    case 87: nb = 9; break;
    case 88: nb = 18; break;
    case 89: nb = 2; break;
    case 90: nb = 36; break;
    case 91: nb = 2; break;
    case 92: nb = 10; break;
    case 93: nb = 9; break;
    case 94: nb = 10; break;
    case 95: nb = 9; break;
    case 96: nb = 35; break;
    case 97: nb = 6; break;
    case 98: nb = 39; break;
    case 99: nb = 6; break;
    case 100: nb = 1; break;
    case 101: nb = 4; break;
    case 102: nb = 1; break;
    case 103: nb = 4; break;
    case 104: nb = 33; break;
    case 105: nb = 24; break;
    case 106: nb = 30; break;
    case 107: nb = 24; break;
    case 108: nb = 1; break;
    case 109: nb = 4; break;
    case 110: nb = 1; break;
    case 111: nb = 4; break;
    case 112: nb = 18; break;
    case 113: nb = 2; break;
    case 114: nb = 36; break;
    case 115: nb = 2; break;
    case 116: nb = 10; break;
    case 117: nb = 9; break;
    case 118: nb = 10; break;
    case 119: nb = 9; break;
    case 120: nb = 18; break;
    case 121: nb = 2; break;
    case 122: nb = 36; break;
    case 123: nb = 2; break;
    case 124: nb = 10; break;
    case 125: nb = 9; break;
    case 126: nb = 10; break;
    case 127: nb = 9; break;
    case 128: nb = 23; break;
    case 129: nb = 28; break;
    case 130: nb = 7; break;
    case 131: nb = 28; break;
    case 132: nb = 41; break;
    case 133: nb = 8; break;
    case 134: nb = 41; break;
    case 135: nb = 8; break;
    case 136: nb = 43; break;
    case 137: nb = 11; break;
    case 138: nb = 44; break;
    case 139: nb = 11; break;
    case 140: nb = 41; break;
    case 141: nb = 8; break;
    case 142: nb = 41; break;
    case 143: nb = 8; break;
    case 144: nb = 21; break;
    case 145: nb = 15; break;
    case 146: nb = 37; break;
    case 147: nb = 15; break;
    case 148: nb = 38; break;
    case 149: nb = 3; break;
    case 150: nb = 38; break;
    case 151: nb = 3; break;
    case 152: nb = 21; break;
    case 153: nb = 15; break;
    case 154: nb = 37; break;
    case 155: nb = 15; break;
    case 156: nb = 38; break;
    case 157: nb = 3; break;
    case 158: nb = 38; break;
    case 159: nb = 3; break;
    case 160: nb = 12; break;
    case 161: nb = 5; break;
    case 162: nb = 45; break;
    case 163: nb = 5; break;
    case 164: nb = 32; break;
    case 165: nb = 26; break;
    case 166: nb = 32; break;
    case 167: nb = 26; break;
    case 168: nb = 46; break;
    case 169: nb = 25; break;
    case 170: nb = 31; break;
    case 171: nb = 25; break;
    case 172: nb = 32; break;
    case 173: nb = 26; break;
    case 174: nb = 32; break;
    case 175: nb = 26; break;
    case 176: nb = 21; break;
    case 177: nb = 15; break;
    case 178: nb = 37; break;
    case 179: nb = 15; break;
    case 180: nb = 38; break;
    case 181: nb = 3; break;
    case 182: nb = 38; break;
    case 183: nb = 3; break;
    case 184: nb = 21; break;
    case 185: nb = 15; break;
    case 186: nb = 37; break;
    case 187: nb = 15; break;
    case 188: nb = 38; break;
    case 189: nb = 3; break;
    case 190: nb = 38; break;
    case 191: nb = 3; break;
    case 192: nb = 35; break;
    case 193: nb = 6; break;
    case 194: nb = 39; break;
    case 195: nb = 6; break;
    case 196: nb = 1; break;
    case 197: nb = 4; break;
    case 198: nb = 1; break;
    case 199: nb = 4; break;
    case 200: nb = 33; break;
    case 201: nb = 24; break;
    case 202: nb = 30; break;
    case 203: nb = 24; break;
    case 204: nb = 1; break;
    case 205: nb = 4; break;
    case 206: nb = 1; break;
    case 207: nb = 4; break;
    case 208: nb = 18; break;
    case 209: nb = 2; break;
    case 210: nb = 36; break;
    case 211: nb = 2; break;
    case 212: nb = 10; break;
    case 213: nb = 9; break;
    case 214: nb = 10; break;
    case 215: nb = 9; break;
    case 216: nb = 18; break;
    case 217: nb = 2; break;
    case 218: nb = 36; break;
    case 219: nb = 2; break;
    case 220: nb = 10; break;
    case 221: nb = 9; break;
    case 222: nb = 10; break;
    case 223: nb = 9; break;
    case 224: nb = 35; break;
    case 225: nb = 6; break;
    case 226: nb = 39; break;
    case 227: nb = 6; break;
    case 228: nb = 1; break;
    case 229: nb = 4; break;
    case 230: nb = 1; break;
    case 231: nb = 4; break;
    case 232: nb = 33; break;
    case 233: nb = 24; break;
    case 234: nb = 30; break;
    case 235: nb = 24; break;
    case 236: nb = 1; break;
    case 237: nb = 4; break;
    case 238: nb = 1; break;
    case 239: nb = 4; break;
    case 240: nb = 18; break;
    case 241: nb = 2; break;
    case 242: nb = 36; break;
    case 243: nb = 2; break;
    case 244: nb = 10; break;
    case 245: nb = 9; break;
    case 246: nb = 10; break;
    case 247: nb = 9; break;
    case 248: nb = 18; break;
    case 249: nb = 2; break;
    case 250: nb = 36; break;
    case 251: nb = 2; break;
    case 252: nb = 10; break;
    case 253: nb = 9; break;
    case 254: nb = 10; break;
    case 255: nb = 9; break;
    default: nb = 13; break;
  }
  return nb;
 }

 
}
