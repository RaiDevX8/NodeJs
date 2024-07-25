require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Connected to MongoDB')
})

// Define Schema and Model
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  imagePath: String,
})
const Item = mongoose.model('Item', itemSchema)

// Set Storage Engine for Multer
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})
const upload = multer({ storage })

// CRUD Routes

// Create
app.post('/items', upload.single('image'), async (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    description: req.body.description,
    imagePath: req.file ? `/uploads/${req.file.filename}` : null,
  })
  try {
    const savedItem = await newItem.save()
    res.status(201).json(savedItem)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Read All
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find()
    res.status(200).json(items)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Read by ID
app.get('/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
    if (item) {
      res.status(200).json(item)
    } else {
      res.status(404).json({ message: 'Item not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update
app.put('/items/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      description: req.body.description,
    }
    if (req.file) {
      updateData.imagePath = `/uploads/${req.file.filename}`

      // Delete the old image file
      const oldItem = await Item.findById(req.params.id)
      if (oldItem && oldItem.imagePath) {
        fs.unlink(`.${oldItem.imagePath}`, err => {
          if (err) console.error(err)
        })
      }
    }
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )
    if (updatedItem) {
      res.status(200).json(updatedItem)
    } else {
      res.status(404).json({ message: 'Item not found' })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete
app.delete('/items/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id)
    if (deletedItem) {
      if (deletedItem.imagePath) {
        fs.unlink(`.${deletedItem.imagePath}`, err => {
          if (err) console.error(err)
        })
      }
      res.status(200).json({ message: 'Item deleted' })
    } else {
      res.status(404).json({ message: 'Item not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
