const express = require('express')
const app = express()

// Define a route that handles query parameters
app.get('/search', (req, res) => {
  // Access query parameters using req.query
  const { query ,mis} = req.query
console.log(req.query
)
  // Simple response using the query parameter
  if (query) {
    res.send(`You searched for: ${query} ${mis}`)
  } else {
    res.send('Please provide a search query.')
  }
})

// Start the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
