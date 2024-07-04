const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
app.use(express.urlencoded({ extended: false }))

const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json')
console.log(p)

fs.readFile(p, 'utf8', (err, data) => {
  if (err) {
    console.log('Something is wrong')
    return
  }

  let cartData
  try {
    cartData = JSON.parse(data)
  } catch (error) {
    console.log('Error parsing JSON:', error)
    return
  }

  if (!cartData || !Array.isArray(cartData.cart)) {
    console.log('Invalid cart data structure')
    return
  }

  const newItem = {
    id: 9,
    name: 'bbc',
    quantity: 5,
    price: 0.6,
  }

  cartData.cart.push(newItem)
  cartData.totalPrice += newItem.quantity * newItem.price

  fs.writeFile(p, JSON.stringify(cartData, null, 2), err => {
    if (err) {
      console.log('Something went wrong while writing file')
      return
    }
    console.log('File has been updated')
  })
})

app.listen(3000, () => {
  console.log('Server is on 3000')
})
