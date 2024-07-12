const mysql = require('mysql')

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'yourUsername',
  password: 'yourPassword',
  database: 'yourDatabase',
})

// Connect to MySQL
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err)
    return
  }
  console.log('Connected to MySQL database')
})

module.exports = connection
