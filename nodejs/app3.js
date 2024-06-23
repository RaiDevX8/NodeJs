const http = require('http')
const fs = require('fs')
const server = http.createServer((req, res) => {
  const url = req.url
  const method = req.method
  const data=[];// to store the chunk data
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
    req.on('data',(chunk)=>{
      console.log(chunk);
      data.push(chunk)
    }) //using on method listen to events (some data event) when new chunck ready to read
    res.on('end',()=>
    {
      const newdata=Buffer.concat(data).toString();
      const splitdata=newdata.split('=')[1];
          fs.writeFileSync('content.txt', splitdata)

      console.log(newdata);
      res.statusCode = 304
      res.setHeader('Location', '/')
      return res.end()
    })

  }

  res.setHeader('Content-Type', 'text/html')
  res.write('<html>')
  res.write('<head></head>')
  res.write('<body><p>hello from my side nogger</p></body>')
  res.write('</html>')
  res.end()
})
server.listen(3000)
