const Product = require("../model/product")

Product.findAll()
  .then(products => {
    console.log(
      'Products found:',
      products.map(product => product.toJSON())
    )
  })
  .catch(err => {
    console.error('Error fetching products:', err)
  })

  Product.findByPk(prodID).then(products => {
    console.log('product found', products)
  })
//conditions

Product.findAll({where:{id:productID}}).then(products=>{ //prodID is hypothetcal
  console.log(products);
}).catch(err=>
{
  console.log(err);
}
)
