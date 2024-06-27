const Product = require('../models/product')

exports.getProducts = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  })
}

exports.postProducts=(req, res, next) => {
  // products.push({ title: req.body.title })
  const products = new Product(req.body.title)
  products.save();
  res.redirect('/')
}
// exports.products = products

exports.productslist = (req, res, next) => {
  // const products = adminData.products
   Product.fetchAll(products => {
     res.render('shop', {
       prods: products,
       pageTitle: 'Shop',
       path: '/',
       hasProducts: products.length > 0,
       activeShop: true,
       productCSS: true,
     })
   })
  // products.fetchall();

}
