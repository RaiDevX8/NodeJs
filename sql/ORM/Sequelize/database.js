const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('blogger', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306, // Ensure the port is correct
  logging: false, // Disable logging if not needed
})

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

module.exports = sequelize
