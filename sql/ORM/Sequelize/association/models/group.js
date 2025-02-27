module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })

  Group.associate = models => {
    Group.belongsToMany(models.User, {
      through: 'UserGroups',
      as: 'users',
      foreignKey: 'groupId',
    })
  }

  return Group
}
