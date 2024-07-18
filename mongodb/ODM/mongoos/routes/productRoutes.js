const express = require('express')
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  renderProductList,
  renderProduct,
  renderProductsByCategory,
} = require('../controllers/productController')
const router = express.Router()

//Api routes

router.route('/api').get(getProducts).post(createProduct)

router
  .route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct)
router.route('/api/category/:category').get(getProductsByCategory)


//view routes
router.route('/').get(renderProductList)
router.route('/:id').get(renderProduct)
router.route('/category/:category').get(renderProductsByCategory)
module.exports = router
