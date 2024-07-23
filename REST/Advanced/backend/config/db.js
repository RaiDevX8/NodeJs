const mongoose = require('mongoose')

const Connect= async ()=>
{
  try {
    await mongoose.connect(
      'mongodb+srv://charan:100@cluster0.jduw5fr.mongodb.net/'
    )
        console.log('MongoDB connected...')

  } catch (error) {
    console.error('MongoDB connection failed:', error.message)

  }
}
module.exports= Connect

