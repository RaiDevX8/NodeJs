const express = require('express')
const Post = require('../model/post')
const { body, validationResult } = require('express-validator')
const router = express.Router()

router.post(
  '/',
  [
    body('title')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Title must be at least 5 characters long'),
    body('author').trim(),
    body('price').isNumeric().withMessage('Price must be a number'),
  ],
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { title, author, price } = req.body
    const newPost = new Post({
      title,
      author,
      price,
    })

    newPost
      .save()
      .then(result => {
        res.status(201).json(result)
      })
      .catch(error => {
        console.error(error)
        res.status(500).json({ message: 'Failed to create post' })
      })
  }
)
router.get('/', (req, res) => {
  Post.find()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      console.error(error)
      res.status(500).json({ message: 'Failed to fetch posts' })
    })
})
module.exports = router
