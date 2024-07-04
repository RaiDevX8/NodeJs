const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();
const { getProducts, postProducts } = require('../controller/products')

// /admin/add-product => GET
router.get('/add-product', getProducts)

// /admin/add-product => POST
router.post('/add-product',postProducts );

module.exports=router
