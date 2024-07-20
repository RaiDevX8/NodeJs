const express = require('express')

const app = express()
const port = 3000

// Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Basic route
app.get('/', (req, res) => {
  res.send(`<form action="/login" method="post">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username">
            <br><br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password">
            <br><br>
            <input type="submit" value="Login">
        </form>`)
})

app.post('/login', (req, res, next) => {
  const { username, password } = req.body

  if (username === 'user' && password === 'pass') {
    res.setHeader('Set-Cookie', `username=${username};`)
    res.send(`<h1>Welcome, ${username}!</h1><a href="/logout">Logout</a>`)
  } else {
    res.send('<h1>Login Failed. <a href="/">Try Again</a></h1>')
  }
})
  app.get('/logout', (req, res) => {
    res.setHeader('Set-Cookie', 'username=; Max-Age=0; HttpOnly')
    res.send('<h1>You have logged out. <a href="/">Login Again</a></h1>')
  })
app.get('/profile',(req,res)=>
{

  const cookie = req.headers.cookie
  console.log(cookie);
  if(cookie)
  {
    const cookieArray = cookie.split(';');
            const cookieObj = {}

    // cookieObj[]
    console.log(cookieArray);
    cookieArray.forEach(cookie=>{
      const [name, value] = cookie.trim().split('=')
      // console.log(name);
      // console.log(value);
      cookieObj[name]=value;
      console.log(cookieObj);
    })
  }
})
// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:port/`)
})
