const fs = require('fs')
const path = require('path')

const getProductFromFile = callback => {
  const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'products.json'
  )

  fs.readFile(p, (err, data) => {
    if (err) {
      callback([])
    } else {
      callback(JSON.parse(data))
    }
  })
}

module.exports = class Product {
  constructor(some) {
    this.something = some
  }

  save() {
    const p = path.join(
      path.dirname(require.main.filename),
      'data',
      'products.json'
    )

    getProductFromFile(products => {
      products.push(this)
      fs.writeFile(p, JSON.stringify(products), err => {
        if (err) {
          console.log(err)
        }
      })
    })
  }

  static fetchAll(callback) {
    getProductFromFile(callback)
  }
}
