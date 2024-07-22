const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

const books = [
  { _id: 1, title: '1984', author: 'George Orwell', price: 8.9 },
  { id: 2, title: 'Brave New World', author: 'Aldous Huxley', price: 9.99 },
  { _id: 9, title: 'Brave  World', author: 'Aous Huxley', price: 89.9 },
]

app.use(cors())
// Middleware to parse JSON bodies
app.use(express.json())

app.post('/posts', (req, res, next) => {
  const { _id, title, author, price } = req.body
  const newBook = {
    _id: books.length + 1,
    title,
    author,
    price,
  }
  books.push(newBook)
  res.status(201).json(newBook)
})
app.get('/posts', (req, res) => {
  res.status(200).json(books)
})

// Basic route
app.get('/', (req, res) => {
  res.send(' app')
})

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:port/`)
})
