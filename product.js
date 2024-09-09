export class product {
  constructor(id, name, price,) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = 1;
  }

  displayInfo() {
    console.log(`id: ${this.id} name: ${this.name} price: ${this.price}`);
  }
}