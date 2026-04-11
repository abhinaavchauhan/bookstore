const express = require('express');
const router = express.Router();
const {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
    .get(getCart)
    .post(addToCart)
    .put(updateCartItem);

router.route('/:itemId')
    .delete(removeCartItem);

module.exports = router;
