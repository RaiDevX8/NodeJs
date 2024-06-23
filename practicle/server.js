const http = require('http')
const fs = require('fs')
const path = require('path')
const { parse } = require('querystring')

const PORT = 3000

// Function to handle the form data and write it to a JSON file
const handleFormSubmission = (req, res) => {
  let body = ''

  // Collect data from the request
  req.on('data', chunk => {
    body += chunk.toString()
  })

  // When the data is fully received
  req.on('end', () => {
    const formData = parse(body)

    // Write form data to a JSON file
    fs.writeFile('formData.json', JSON.stringify(formData, null, 2), err => {
      if (err) {
        console.error('Error writing to file', err)
        res.statusCode = 500
        res.end('Internal Server Error')
        return
      }
      res.end('Form data received and stored')
    })
  })
}

// Function to serve the HTML file
const serveHtml = res => {
  fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
    if (err) {
      res.statusCode = 500
      res.end('Internal Server Error')
      return
    }
    res.setHeader('Content-Type', 'text/html')
    res.end(data)
  })
}

// Create the server
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    serveHtml(res)
  } else if (req.method === 'POST' && req.url === '/') {
    handleFormSubmission(req, res)
  } else {
    res.statusCode = 404
    res.end('Not Found')
  }
})

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
