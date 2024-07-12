// userController.js

const userModel = require('./userModel')

function getUsers(req, res) {
  userModel.getAllUsers((err, users) => {
    if (err) {
      console.error('Error fetching users:', err)
      res.status(500).json({ error: 'Error fetching users' })
      return
    }
    res.json(users)
  })
}

module.exports = {
  getUsers,
}
