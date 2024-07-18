const Product = require('../models/product')

// @desc    Get all products (JSON)
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Render product list
// @route   GET /products
// @access  Public
const renderProductList = async (req, res) => {
  try {
    const products = await Product.find({})
    res.render('productList', { products })
  } catch (error) {
    res.status(500).render('error', { message: error.message })
  }
}

// @desc    Get single product (JSON)
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Render single product
// @route   GET /products/:id
// @access  Public
const renderProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product)
      return res.status(404).render('error', { message: 'Product not found' })
    res.render('product', { product })
  } catch (error) {
    res.status(500).render('error', { message: error.message })
  }
}

// @desc    Create a new product
// @route   POST /api/products
// @access  Public
const createProduct = async (req, res) => {
  const { name, price, description, category, inStock } = req.body
  try {
    const product = new Product({ name, price, description, category, inStock })
    await product.save()
        res.redirect(`/products/${product._id}`)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Public
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })

    const updates = req.body
    Object.assign(product, updates)
    await product.save()

    res.status(200).json(product)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Public
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })

    await product.remove()
    res.status(200).json({ message: 'Product removed' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get products by category (JSON)
// @route   GET /api/products/category/:category
// @access  Public
const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category })
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Render products by category
// @route   GET /products/category/:category
// @access  Public
const renderProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category })
    res.render('productList', { products })
  } catch (error) {
    res.status(500).render('error', { message: error.message })
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  renderProductList,
  renderProduct,
  renderProductsByCategory,
}
