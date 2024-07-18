const express = require('express')
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const expressLayouts = require('express-ejs-layouts')
require('dotenv').config()
const path = require('path') // Import path module

const app = express()

// Connect to MongoDB
connectDB()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Set EJS as the view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views')) // Corrected views directory path

// Use express-ejs-layouts middleware
app.use(expressLayouts)
app.set('layout', 'layout') // Specify the layout file name (without extension)

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/products', productRoutes)

// Home route
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' })
})

// 404 Error handling
app.use((req, res, next) => {
  res.status(404).render('error', { message: 'Page not found' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
