const Cart = require('../models/Cart');
const Book = require('../models/Book');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id }).populate('items.book', 'title price coverImage');

        if (!cart) {
            cart = await Cart.create({ user: req.user._id, items: [] });
        }

        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res) => {
    const { bookId, quantity } = req.body;

    try {
        const book = await Book.findById(bookId);

        if (!book) {
            res.status(404);
            throw new Error('Book not found');
        }

        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = await Cart.create({ user: req.user._id, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.book.toString() === bookId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity || 1;
        } else {
            cart.items.push({
                book: bookId,
                quantity: quantity || 1,
                price: book.price
            });
        }

        await cart.save();

        // Populate to return full details
        cart = await cart.populate('items.book', 'title price coverImage');

        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart
// @access  Private
const updateCartItem = async (req, res) => {
    const { bookId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            res.status(404);
            throw new Error('Cart not found');
        }

        const itemIndex = cart.items.findIndex(item => item.book.toString() === bookId);

        if (itemIndex > -1) {
            if (quantity > 0) {
                cart.items[itemIndex].quantity = quantity;
            } else {
                // If quantity is 0 or less, remove item
                cart.items.splice(itemIndex, 1);
            }
            await cart.save();
            cart = await cart.populate('items.book', 'title price coverImage');
            res.status(200).json({ success: true, data: cart });
        } else {
            res.status(404);
            throw new Error('Item not found in cart');
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:bookId
// @access  Private
const removeCartItem = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            res.status(404);
            throw new Error('Cart not found');
        }

        // Params is named itemId in routes but we treat it as bookId
        const bookId = req.params.itemId;
        const itemIndex = cart.items.findIndex(item => item.book.toString() === bookId);

        if (itemIndex > -1) {
            cart.items.splice(itemIndex, 1);
            await cart.save();
            cart = await cart.populate('items.book', 'title price coverImage');
            res.status(200).json({ success: true, data: cart });
        } else {
            res.status(404);
            throw new Error('Item not found in cart');
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem
};
