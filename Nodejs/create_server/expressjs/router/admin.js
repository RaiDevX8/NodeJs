const express =require('express')
const router =express.Router();

router.use('/adds', (req, res, next) => {
  res.send(
    `<form method="POST" action="/submit">
      <input type="text" name="name"/>
      <input type="text" name="email"/>
      <button type="submit">submit</button>
    </form>`
  )
})
router.use('/submit', (req, res, next) => {
  console.log('this is from submit')
  console.log(req.body)
  res.redirect('/')
})
module.exports=router
