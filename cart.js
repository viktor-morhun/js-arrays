export class cart {
  constructor() {
    this.data = [];
    this.totalPrice = 0;
    this.totalAmount = 0;
  }

  addProduct({id, title, price}) {
    const productIndex = this.data.findIndex((product) => product.id === id);
    if(productIndex === -1) {
      this.data.push({
        id,
        title,
        price,
        quantity: 1,
      });
    } else {
      this.data[productIndex].quantity += 1;
    }
  }
  removeProduct({id}) {
    const productIndex = this.data.findIndex((product) => product.id === id);
    this.data.splice(productIndex, 1);

    //update state
  }
  changeQuantity(id, numberToChange) {
    const productIndex = this.data.findIndex((product) => product.id === id);
    console.log(productIndex);
    if(this.data[productIndex].quantity + numberToChange <= 0 || this.data[productIndex].quantity <= 0) {
      this.removeProduct(id);
    } else {
      this.data[productIndex].quantity += numberToChange;
    }

    //update state
  }
  calculatePrice() {
    const productsPrice = this.data.reduce(
      (total, product) => {
        total.price += product.price * product.quantity;
        total.quantity += product.quantity;
        return total;
      },
      {
        price: 0,
        quantity: 0,
      }
    );
    return productsPrice;
  }
}