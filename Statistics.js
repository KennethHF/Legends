/****** STATISTICS OF THE RPG GAME: LEGEND ******/

/*** CHARACTER ATTRIBUTES ***
  These are the main, high-level stats that each character has.
  As these go up, they impact other character properties that affect
  all aspects of the gameplay.  The key difference between attributes
  and properites are that when a player levels up, they manually
  apply earned points to their desired attributes.
*/
let AttributeNames = [
  "Vitality",
  "Strength",
  "Defense",
  "Dexterity",
  "Magic"
];

function createAttributesList() {
  var list = [];
  for (var attr of AttributeNames) {
    var a = {name:attr, value:0};
    list.push(a);
  }
  return list;
}

/*** CHARACTER PROPERTIES ***
  Properties are the stats that determine the aspects of
  gameplay. Unlike Attributes, Properties cannot be directly
  changed.  They are modified through Attribute points and
  item modifiers.
*/
let PropertyNames = [
  "Max Health",                 //0 Vitality
  "Health",                     //1 Vitality
  "Max Stamina",                //2 Vitality
  "Stamina",                    //3 Vitality
  "Max Magic",                  //4 Magic
  "Magic",                      //5 Magic
  "Recovery Rate",              //6 Magic
  "Min Attack",                 //7 Strength
  "Max Attack",                 //8 Strength
  "Inventory Slots",            //9 Strength
  "Block Chance",               //10 Defense
  "Armor",                      //11 Defense
  "Hit Chance",                 //12 Dexterity
  "Dodge Chance",               //13 Dexterity
  "Attack Speed"                //14 Dexterity
];

function createPropertiesList() {
  var list = [];
  for (var prop of PropertyNames) {
    var p = {name:prop, value: 0};
    list.push(p);
  }
  return list;
}

/*** MODIFIERS ***
  These are unique property-like stats that can be added
  to a character.  Unlike properties, which are always
  present to some degree, these modifiers can only be
  acquired through items.
*/
let ModifierNames = [
  "Leech", //Applies an increase to health each time a successfull kill
  "Thorns", //Applies small damage against enemy when they land a hit on the player
  "Multistrike", //Chance to land two hits instead of one
  "Penetration", //An amount of damage ignores the armor of the enemy
  "Luck", //Improves chances of better drops and more gold
  "Sight", //Increases visible map area
  "Critical Hit", //Chance the final attack value is increased

];

function createModifiersList() {
  var list = [];
  for (var mod of ModifierNames) {
    var m = { name: mod, isActive: false, value: 0 };
    list.push(m);
  }
  return list;
}

/*** STAT COLLECTION ***
  The stat collection is a combination of Attributes,
  Properties, and Modifiers.
*/
class StatCollection {
  constructor() {
    this.clearAll();
  }

  clearAttributes() {
    this.attribute = createAttributesList();
  }

  clearProperties() {
    this.property = createPropertiesList();
  }

  clearModifiers() {
    this.modifier = createModifiersList();
  }

  clearAll() {
    this.clearAttributes();
    this.clearProperties();
    this.clearModifiers();
  }


  /*** SET PROPERTIES FROM ATTRIBUTES ***
    ALL_CAPS values are mulitpliers used to maintain game balance.
    Changing them may result in an inbalanced gameplay experience.
    This function combines multiple stat sheets together. Use this
    to combine a character stat sheet with all the equipped items
    they are carrying.
  */
  setPropertiesFromAttributes() {
    this.clearProperties();
    
    //Set Health values
    var HEALTH_MULTIPLIER = 10;
    this.property[0].value = HEALTH_MULTIPLIER * this.attribute[0].value;
    this.property[1].value = this.property[0].value;

    //Set Stamina values
    var STAMINA_MULTIPLIER = 4;
    this.property[2].value = STAMINA_MULTIPLIER * this.attribute[0].value;
    this.property[3].value = this.property[2].value;

    //Set Magic values
    var MAGIC_MULTIPLIER = 7;
    this.property[4].value = MAGIC_MULTIPLIER * this.attribute[4].value;
    this.property[5].value = this.property[4].value;

    //Set Recovery values
    var RECOVERY_MULTIPLIER = 0.35;
    this.property[6].value = RECOVERY_MULTIPLIER * this.attribute[4].value;
    
    //Set Attack values
    var ATTACK_MIN_MULTIPLIER = 0.15;
    this.property[7].value = this.attribute[1].value * ATTACK_MIN_MULTIPLIER;
    var ATTACK_MAX_MULTIPLIER = 0.45;
    this.property[8].value = this.attribute[1].value * ATTACK_MAX_MULTIPLIER;

    //Set Inventory Slot values
    var START_SLOTS = 12;
    var MAX_SLOTS = 40;
    var MIN_STRENGTH = 10;
    var SLOT_MULTIPLIER = 0.5;
    this.property[9].value = START_SLOTS;
    if (this.attribute[1].value > MIN_STRENGTH) {
      this.property[9].value += (this.attribute[1].value - MIN_STRENGTH) * SLOT_MULTIPLIER;
    }
    this.property[9].value = floor(this.property[9].value);
    if (this.property[9].value > MAX_SLOTS) this.property[9].value = MAX_SLOTS;

    //Set Block values
    var BLOCK_MULTIPLIER = 0.25;
    var PERCENTAGE_MAX = 75;
    this.property[10].value = BLOCK_MULTIPLIER * this.attribute[2].value;
    if (this.property[10].value > PERCENTAGE_MAX) this.property[10].value = PERCENTAGE_MAX;

    //Set Armor values
    var ARMOR_MULTIPLIER = 1;
    this.property[11].value = ARMOR_MULTIPLIER * this.attribute[2].value;

    //Set Hit Chance values
    var HIT_MULTIPLIER = 0.25;
    var BASE_START = 50;
    PERCENTAGE_MAX = 95;
    this.property[12].value = BASE_START + (HIT_MULTIPLIER * this.attribute[3].value);
    if (this.property[12].value > PERCENTAGE_MAX) this.property[12].value = PERCENTAGE_MAX;

    //Set Dodge values
    var DODGE_MULTIPLIER = 0.4;
    PERCENTAGE_MAX = 75;
    this.property[13].value = DODGE_MULTIPLIER * this.attribute[3].value;
    if (this.property[13].value > PERCENTAGE_MAX) this.property[13].value = PERCENTAGE_MAX;

    //Set Attack Speed values
    var ATTACK_SPEED_MULTIPLIER = 0.10;
    this.property[14].value = ATTACK_SPEED_MULTIPLIER * this.attribute[3].value;
  }

  /*** COPY ***
    Copies the parameter stat collection into
    this stat collection. Overwrites all existing
    content. 
  */
  copy(sCollection) {
    this.clearAll();
    this.attribute = JSON.parse(JSON.stringify(sCollection.attribute));
    this.property = JSON.parse(JSON.stringify(sCollection.property));
    this.modifier = JSON.parse(JSON.stringify(sCollection.modifier));
  }

  /*** ADD ***
    Combines two Stat Collections 
  */
  add(sCollection) {
    for (var i = 0; i < this.attribute.length; i++)
      this.attribute[i].value += sCollection.attribute[i].value;

    for (var i = 0; i < this.property.length; i++)
      this.property[i].value += sCollection.property[i].value;

    for (var i = 0; i < this.modifier.length; i++) {
      if (sCollection.modifier[i].isActive == true) {
        this.modifier[i].isActive = true;
        this.modifier[i].value += sCollection.modifier[i].value;
      }
    }
  }

  /*** COMBAT ***
  Combat is done between two Stat Collections
  */
  attemptAttack(sCollection) {

  }

}






/*
 Items have durability that determine max usage before repair is required
*/




/*** EXPERIENCE POINTS CALCULATOR ***
  The level of an enemy character is the experience
  points earned.  For example, a level 6 enemy will
  apply 6 experience points to the player's experience.
  The function below returns the amount of experience
  needed to reach the parameter level.
*/
function getMinExperience(level) {
  if (level <= 1) return 0;
  var MULTIPLIER = 1.5;
  var exp = 3;
  for (var i = 2; i < 101; i++) {
    if (level == i) break;
    if (i >= 20) MULTIPLIER = 1.25;
    if (i >= 40) MULTIPLIER = 1.35;
    if (i >= 60) MULTIPLIER = 1.45;
    if (i >= 80) MULTIPLIER = 1.55;
    exp += (i * MULTIPLIER) * i;
  }
  return floor(exp);
}