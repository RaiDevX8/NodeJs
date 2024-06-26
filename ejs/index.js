const http = require('http')
const express = require('express')
const { parse } = require('querystring')
const path = require('path')
const fs = require('fs')

const app = express()
app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.post('/submit', (req, res, next) => {
  const { name, email, number } = req.body
  console.log(name, email, number)
  res.render('redirect', { name, email, number })
})

app.get('/', (req, res, next) => {
  console.log('home page')
  const filename = path.join(__dirname, 'public', 'index.html')
  fs.readFile(filename, (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error')
    } else {
      res.status(200).type('text/html').send(data)
    }
  })
})

app.use((req, res) => {
  res.status(404).send('Not Found')
})
app.listen(3000, () => {
  console.log('started the server')
})
