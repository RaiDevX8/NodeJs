const userModel = require('./userModel')

// Controller function to fetch all users
async function getAllUsers(req, res) {
  try {
    const users = await userModel.fetchAllUsers()
    res.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// Controller function to save a new user
async function createUser(req, res) {
  const { username, email, password } = req.body
  try {
    const result = await userModel.saveUser(username, email, password)
    res.status(201).json({ message: 'User created successfully', result })
  } catch (error) {
    console.error('Error saving user:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = {
  getAllUsers: getAllUsers,
  createUser: createUser,
}
