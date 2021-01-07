const express = require('express');
const router = express.Router()
const ProductsController = require('../controllers/products');
const mongoose = require('mongoose');
const Product = require('../models/product')

router.get('/', ProductsController.products_get_all);

router.get('/:productId', ProductsController.products_get_product)

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product!'
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted product!'
    });
});

module.exports = router;