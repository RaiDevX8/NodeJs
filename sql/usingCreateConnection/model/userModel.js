const db = require('./db')

// Function to fetch all users
function fetchAllUsers() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM user'
    db.query(sql, (err, results) => {
      if (err) {
        reject(err)
        return
      }
      resolve(results)
    })
  })
}

// Function to save a new user
function saveUser(username, email, password) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO user (username, email, password) VALUES (?, ?, ?)'
    const values = [username, email, password]
    db.query(sql, values, (err, result) => {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
}

module.exports = {
  fetchAllUsers: fetchAllUsers,
  saveUser: saveUser,
}
