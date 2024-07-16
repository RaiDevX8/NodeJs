const { Sequelize, DataTypes } = require('sequelize')

// Initialize Sequelize with MySQL database credentials
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Disable logging; default: console.log
})

// Import and define models
const User = require('./models/user')(sequelize, DataTypes)
const Profile = require('./models/profile')(sequelize, DataTypes)
const Post = require('./models/post')(sequelize, DataTypes)
const Group = require('./models/group')(sequelize, DataTypes)
const UserGroup = require('./models/userGroup')(sequelize, DataTypes)

// Setup associations between models
User.associate({ Profile, Post, Group })
Profile.associate({ User })
Post.associate({ User })
Group.associate({ User })

// Sync all defined models to the database
sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Database & tables created!')
  })
  .catch(err => {
    console.error('Error syncing database:', err)
  })

module.exports = { sequelize, User, Profile, Post, Group, UserGroup }
