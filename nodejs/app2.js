const http = require('http')
const fs=require('fs');
const server = http.createServer((req, res) => {
  const url = req.url
  const method = req.method
  if (url === '/') {
    res.write('<html>')
    res.write('<head>enter message</head>')
    res.write(
      '<body><form action="/message" method="POST"><input name="message" type="text"/> <button type="submit">submit</button></form></body>'
    )
    res.write('</html>')
    return res.end()
  }
  if (url === '/message' && method === 'POST') {
      fs.writeFileSync('content.txt',"somrthing goest here")
      res.statusCode=304;
      res.setHeader('Location','/')
      return res.end();
  }

  res.setHeader('Content-Type', 'text/html')
  res.write('<html>')
  res.write('<head></head>')
  res.write('<body><p>hello from my side nogger</p></body>')
  res.write('</html>')
  res.end()
})
server.listen(3000)
