/*
class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;
  

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }

  go() {
    if(!this.isTrunkOpen) {
      this.speed += 5;
    }

    if(this.speed > 200) {
      this.speed = 200;
    }
  }

  break() {
    this.speed -= 5;

    if(this.speed < 0) {
      this.speed = 0; 
    }
  }

  openTrunk() {
    if(this.speed > 0) {
      return;
    }
    this.isTrunkOpen = true;
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }

  displayInfo() {
    console.log(`${this.#brand} - ${this.#model}, Speed: ${this.speed}km/h, Trunk Status: ${this.isTrunkOpen ? 'Open' : 'Closed'}`);
  }
}


class RaceCar extends Car {
  acceleration;

  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go() {
    this.speed += this.acceleration;

    if(this.speed > 300) {
      this.speed = 300;
    }
  }

  openTrunk() {
    console.log('Race Car do not have a Trunk.');
  }

  closeTrunk() {
    console.log('Race Car do not have a Trunk.');
  }

}

const car1 = new Car({
  brand: "Toyota",
  model: "Corolla"
});
console.log(car1);

car1.openTrunk();
car1.go();
car1.displayInfo();
car1.closeTrunk();
car1.displayInfo();
car1.go();
car1.go();
car1.go();
car1.break();
car1.openTrunk();
car1.displayInfo();



const car2 = new Car({
  brand: "Tesla",
  model: "Model 3"
});
console.log(car2);

car2.openTrunk();
car2.go();
car2.displayInfo();
car2.closeTrunk();
car2.displayInfo();
car2.go();
car2.go();
car2.break();
car2.openTrunk();
car2.displayInfo();



const raceCar = new RaceCar({
  brand: "McLaren",
  model: "F1",
  acceleration: 20
});
console.log(raceCar);

raceCar.displayInfo();
raceCar.go();
raceCar.go();
raceCar.go();
raceCar.displayInfo();
raceCar.break();
raceCar.displayInfo();
raceCar.openTrunk();
raceCar.displayInfo();
*/