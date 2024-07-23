const express = require('express')
const Product = require('../models/product')
const router = express.Router()

router.post('/admin/add-product', (req, res, next) => {
  const { title, imageUrl, price, description } = req.body

  const product = new Product({
    title,
    price,
    imageUrl,
    description,
  })  

  product
    .save()
    .then(result => {
      console.log('Created product')
      res.redirect('/')
    })
    .catch(err => {
      console.log(err)
      res.status(500).send('Error creating product')
    })
})

module.exports = router
