
class Human {
  constructor(type = 'human') {
    this.type = type;
  }

  static isHuman(human) {
    return human instanceof Human;
  }

  breathe() {
    alert('h-a-a-a-m');
  }
}

class Zero extends Human {
  constructor(type, firstName, lastName) {
    super(type);
    this.firstName = firstName;
    this.lastName = lastName;
  }

  sayName() {
    super.breathe();
    alert(`${this.firstName} ${this.lastName}`);
  }
}

console.log('ZERO ##################################');
const newZero = new Zero('human', 'Zero', 'Cho');

  console.log('firstName', newZero.firstName);
  console.log('lastName', newZero.lastName);
  console.log('type', newZero.type);
  newZero.firstName = 'NONE';
  console.log('firstName', newZero.firstName);

  Human.isHuman(newZero); // true


class One extends Human{
  /* 생성자는 하나만 생성가능하다. */
  constructor( firstName, lastName ){
    super("One");
    this.firstName = firstName;
    this.lastName = lastName;
  }

  sayName(){
    console.log(`${this.firstName} :: ${this.lastName}` );    
  }
}

console.log('ONE ##################################');
const newOne = new One( "YOON", "HYUNCHUL" );

console.log('firstName', newOne.firstName);
console.log('lastName', newOne.lastName);
console.log('type', newZero.type);


