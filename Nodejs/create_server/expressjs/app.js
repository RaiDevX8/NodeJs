const http=require('http')
const Bodyparse=require('body-parser')
const express=require('express');
const bodyParser = require('body-parser');
const adminRouter=require('./router/admin')
const shopRouter=require('./router/shop')
const path=require('path')
const app=express();
app.use(bodyParser.urlencoded({extended:false}))



// app.use(adminRouter)
app.use(shopRouter)
app.use('/',(req,res,next)=>
{
  res.sendFile(path.join(__dirname,'./','views','PageNotFound.html'))
})
app.listen(3000)
