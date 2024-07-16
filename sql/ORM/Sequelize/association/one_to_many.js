// models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
  })

  User.associate = models => {
    User.hasMany(models.Post, {
      foreignKey: 'userId',
      as: 'posts',
    })
  }

  return User
}

// models/post.js
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
  })

  Post.associate = models => {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    })
  }

  return Post
}
