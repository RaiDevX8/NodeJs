// const { DataTypes } = require("sequelize");
// const sequelize = require("../../database");

module.exports= (sequelize,DataTypes)=>
{
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })

  User.associate=(models)=>
  {
    //user have one profile
    User.hasOne(models.Profile,{
      foreginKey:'userId',
      as:'profile'
    });

    //user has many Posts
    User.hasMany(models.Post,{
        foreginKey:'userId',
        as:'post'
    })

    //user belongs to many groups (through userGroup)
    User.belongsToMany(models.Group,{
      through:'userGroup',
      as:'groups',
      foreginKey:'userId'
    })
  }
  return User;
}
