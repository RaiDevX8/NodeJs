const express = require('express')
const path = require('path')
const multer = require('multer')

const app = express()
const port = 3000

// Middleware to parse JSON bodies
app.use(express.json())

//setting storage
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({ storage })

app.use('/uploads', express.static('uploads'))

app.post('/upload', upload.single('image'), (req, res) => {
  try {
    res.send(
      `Image uploaded: <img src="/uploads/${req.file.filename}" alt="uploaded image" />`
    )
  } catch (error) {
    console.error(error)
    res.status(500).send('Failed to upload image')
  }
})

// // Basic route
// app.get('/', (req, res) => {
//   res.send('Hello, world!')
// })

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:port/`)
})
