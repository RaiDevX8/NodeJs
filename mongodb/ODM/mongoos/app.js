const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const adminRoutes = require('./controllers/admin')
const app = express()
const port = 3000

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')))

// Use the admin routes
app.use(adminRoutes)

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, world!')
})

// MongoDB connection string
const url = ''

// Connect to MongoDB and start the server
mongoose
  .connect(url)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`)
    })
  })
  .catch(err => {
    console.log(err)
  })
