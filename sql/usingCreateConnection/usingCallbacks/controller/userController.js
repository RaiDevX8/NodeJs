const userModel = require('../model/userModel')

function getUser(req,res){
  userModel.getAllUsers((err,user)=>
  {
    if (err) {
      console.error('Error fetching users:', err)
      res.status(500).json({ error: 'Error fetching users' })
      return
    }
    res.json(user);
  })
}
