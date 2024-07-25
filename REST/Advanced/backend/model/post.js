const mongoose = require('mongoose')

// Define the schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    trim: true, // Adding trim to the author field
  },
  price: {
    type: Number,
    min: 0, // Ensuring the price is non-negative
  },
},
{timestamps:true})

// Export the model
module.exports = mongoose.model('Post', postSchema)
