const express = require('express')
const cors = require('cors')
const { body, validationResult } = require('express-validator')
const postRouter = require('./controller/post') // Ensure the path is correct
const Connect = require('./config/db')
const app = express()
const port = 3000

// Use CORS middleware
app.use(cors())

// Middleware to parse JSON bodies
app.use(express.json())

// Connect to MongoDB
Connect()

// Use the postRouter for /posts routes
app.use('/posts', postRouter)

// Basic route
app.get('/', (req, res) => {
  res.send('App is running')
})

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})
