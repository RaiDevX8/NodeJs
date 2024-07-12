const db = require('../db')

function getAllUsers (callback){
  db.query('SELECT * FROM user',(err,result)=>
  {
    if (err) {
      callback(err, null)
      return
    }
    callback(null,result)
  })
}
module.exports = {
  getAllUsers,
}
