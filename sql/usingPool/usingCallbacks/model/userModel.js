// userModel.js

const pool = require('./db')

function getAllUsers(callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      callback(err, null)
      return
    }

    connection.query('SELECT * FROM users', (err, results) => {
      connection.release() // Release connection after query

      if (err) {
        callback(err, null)
      } else {
        callback(null, results)
      }
    })
  })
}

module.exports = {
  getAllUsers,
}
