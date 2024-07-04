const path = requier('path')
const fs = require('fs')


const p=path.join(path.dirname(require.main.filename),'data','cart.json')
module.exports = class Cart {
  static addProduct(id,productPrice){
    //fetch the previous cart
    fs.readFile(p,(err,fileContent)=>{
      let cart = { products: [], totalPrice: 0 }
      if (!err) {
        cart = JSON.parse(fileContent)
      }
      //find existing product
      const existingProductindex = cart.products.findIndex(prod => prod.id === id)
      const existingProduct = cart.products(existingProductindex)
      let updateProduct;
      //add new product increase quantity

      if (existingProduct) {
        updateProduct = { ...existingProduct }
        updateProduct.qty = updateProduct.qty + 1
      } else {
        updateProduct = {
          id: id,
          qty: 1,
        }
        cart.totalPrice = cart.totalPrice + productPrice;
        fs.writeFile(p,JSON.stringify(cart),(err)=>
        {
          console.log(err);
        })
        cart.products=[...cart.products,updateProduct]
      }
    }
  )
  }
}
