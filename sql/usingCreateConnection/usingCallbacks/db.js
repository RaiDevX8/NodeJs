const mysql = require('mysql2')

const connection = mysql.createConnection({
  host:'localhost',
  password:'',
  database:'',
  user:''
})
connection.connect(err=>
{
  if(err)
  {
    console.log(err);
    return
  }
  console.log('connected');
}
)
module.exports=connection


