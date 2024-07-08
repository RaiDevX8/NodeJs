const {Product} = require('../../model/cart')


// console.log(product);
let cart=[{
  name:"",
  price:"",
  quantity:""
}]
class Cart{
  constructor(){
    this.item=[];
  }
   addtoCart(product){
       const index = this.item.findIndex(item => item.name === product.name)
       if (index !== -1) {
         // If product exists, update the quantity
         this.item[index].quantity += product.quantity
       } else {
         // If product doesn't exist, add to cart
         this.item.push(product)
       }
  }
  getTotalPrice(){
    return this.item.reduce((total,product)=>
      {
        return total+=product.price*product.quantity,0
      })
    }
    getCartItems(){
      return this.item
    }
  }
  const product1 = new Product('Laptop', 1000, 1)
  const product2 = new Product('Smartphone', 700, 2)
  const product3 = new Product('Tablet', 300, 3)
  const product4 = new Product('Laptop', 1000, 1)

  const CartItem = new Cart();
CartItem.addtoCart(product1);
CartItem.addtoCart(product2);
CartItem.addtoCart(product4);


console.log(CartItem.getCartItems());
