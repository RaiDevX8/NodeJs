Product.create({
  name: 'Laptop',
  price: 1200.0,
  description: 'High-performance laptop with SSD storage.',
})
  .then(product => {
    console.log('Product created:', product.toJSON())
  })
  .catch(err => {
    console.error('Error creating product:', err)
  })
