const express = require('express')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const mongoose = require('mongoose')

const app = express()
const PORT = 3000

// MongoDB Connection
mongoose.connect('mongodb://localhost/session-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Connected to MongoDB')
})

// Create a MongoDB session store
const store = new MongoDBStore({
  uri: 'mongodb://localhost/session-db',
  collection: 'sessions',
})

store.on('error', function (error) {
  console.log(error)
})

// Configure session middleware with MongoDB store
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 600000, // 10 minutes
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
      sameSite: 'strict',
    },
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

  if (username === 'user' && password === 'pass') {
    req.session.username = username
    res.send(
      `<h1>Welcome, ${username}!</h1><a href="/profile">Go to Profile</a> <br><a href="/logout">Logout</a>`
    )
  } else {
    res.send('<h1>Login Failed. <a href="/">Try Again</a></h1>')
  }
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
