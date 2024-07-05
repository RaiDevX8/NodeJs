const products = []
class Product {

  constructor(name, price, quantity) {
    this.name = name
    this.price = price
    this.quantity = quantity
  }

  addProduct() {
    products.push(this)

    console.log(this)
    // console.log('after this');
  }
  static showall() {
    console.log(products.toString())
  }
}
module.exports={Product}
