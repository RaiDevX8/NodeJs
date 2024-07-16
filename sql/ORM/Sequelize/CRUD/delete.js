const Product = require("../model/product")

Product.destroy({
  where: { id: 1 },
})
  .then(num => {
    if (num === 1) {
      console.log('Product deleted successfully.')
    } else {
      console.log('Product not found or no delete made.')
    }
  })
  .catch(err => {
    console.error('Error deleting product:', err)
  })

  //OR

  Product.findByPk(produtID).then(prodduct=>
  {
    return prodduct.destroy();  //returns promise
  }
  ).then(console.log('DELEted')).catch(err=>console.log(err))
