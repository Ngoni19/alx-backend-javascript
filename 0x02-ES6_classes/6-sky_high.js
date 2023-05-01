import  Building  from './5-building';

export class SkyHighBuilding extends Building {
  constructor(sqft, floors) {
    super(sqft);
    this._floors = floors;
  }

  get floors() { return this._floors; }

  get sqft() { return super.sqft; }

  evacuationWarningMessage() {
    return `Evacuate slowly the ${this._floors} floors.`;
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> ab7475fdfb8145184dfbf94a1f583fbbba754a39
