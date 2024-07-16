// models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
  })

  User.associate = models => {
    User.hasOne(models.Profile, {
      foreignKey: 'userId',
      as: 'profile',
    })
  }

  return User
}

// models/profile.js
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    bio: DataTypes.STRING,
  })

  Profile.associate = models => {
    Profile.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    })
  }

  return Profile
}
