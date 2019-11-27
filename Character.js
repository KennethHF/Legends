class Character {
  constructor(isPlayer = false) {
    
    this.experiencePoints = 0;
    this.level = 1;

    this.goldBalance = 0;

    this.stats = new StatCollection();
    if (isPlayer) {
      this.stats.attribute[0].value = 10;
      this.stats.attribute[1].value = 7;
      this.stats.attribute[2].value = 7;
      this.stats.attribute[3].value = 5;
      this.stats.attribute[4].value = 5;
      this.unallocatedAttributePoints = 10;
      this.stats.setPropertiesFromAttributes();
    }

    //Array holder for items
    this.inventory = [];

    //Items the character is wearing/holding
    this.equipment = [];


  }




}