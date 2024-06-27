const path = require('path');

const express = require('express');

// const adminData = require('./admin');
// const rootDir = require('../util/path');
const poductController=require('../controller/products')
const router = express.Router();

router.get('/', poductController.productslist)

module.exports = router;
