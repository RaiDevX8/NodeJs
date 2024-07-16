Product.update(
  { price: 1300.0 },
  {
    where: { id: 1 },
  }
)
  .then(num => {
    if (num[0] === 1) {
      console.log('Product updated successfully.')
    } else {
      console.log('Product not found or no update made.')
    }
  })
  .catch(err => {
    console.error('Error updating product:', err)
  })
