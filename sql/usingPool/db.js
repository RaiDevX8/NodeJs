const mysql = require('mysql')

// Create MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10, // adjust as per your needs
  host: 'localhost',
  user: 'yourUsername',
  password: 'yourPassword',
  database: 'yourDatabase',
})

module.exports = pool
