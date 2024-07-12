const express = require('express')
const bodyParser = require('body-parser')
const userController = require('./userController')

const app = express()
const port = 3000

// Middleware to parse JSON bodies
app.use(bodyParser.json())

// Routes
app.get('/users', userController.getAllUsers)
app.post('/users', userController.createUser)

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
