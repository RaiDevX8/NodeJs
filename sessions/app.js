const express = require('express')
const session = require('express-session')

const app = express()
const PORT = 3000

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }))

// Configure session middleware
app.use(
  session({
    secret: 'your-secret-key', // Change this to a secret key of your choice
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }, // Session expiry time in milliseconds (e.g., 10 minutes)
  })
)

app.get('/', (req, res) => {
  res.send(`
        <h1>Login Page</h1>
        <form action="/login" method="post">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username">
            <br><br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password">
            <br><br>
            <input type="submit" value="Login">
        </form>
    `)
})

app.post('/login', (req, res) => {
  const { username, password } = req.body
  // For simplicity, assume the correct credentials are username: "user" and password: "pass"
  if (username === 'user' && password === 'pass') {
    req.session.username = username
    console.log(req.session.touch());
    res.send(
      `<h1>Welcome, ${username}!</h1><a href="/profile">Go to Profile</a> <br><a href="/logout">Logout</a>`
    )
  } else {
    res.send('<h1>Login Failed. <a href="/">Try Again</a></h1>')
  }
  console.log(req.session);
})

app.get('/profile', (req, res) => {
  if (req.session.username) {
    res.send(
      `<h1>Welcome back, ${req.session.username}!</h1><a href="/logout">Logout</a>`
    )
  } else {
    res.send('<h1>Please log in. <a href="/">Login</a></h1>')
  }
})

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send('Error logging out.')
    }
    res.send('<h1>You have logged out. <a href="/">Login Again</a></h1>')
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
