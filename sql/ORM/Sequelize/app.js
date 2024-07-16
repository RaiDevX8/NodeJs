const express = require('express')
const sequelize = require('./database')
const Product = require('./model/product')

const app = express()
const port = 3000

// Middleware to parse JSON bodies
app.use(express.json())

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, world!')
})

// Route to create a new product
app.post('/product', async (req, res) => {
  try {
    const newProduct = await Product.create({
      title: req.body.title,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
    })
    res.status(201).json(newProduct)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

//route to find all the product


// Sync the database and start the server
sequelize
  .sync()
  .then(() => {
    console.log('Database synced successfully.')
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`)
    })
  })
  .catch(err => {
    console.error('Unable to sync the database:', err)
  })
