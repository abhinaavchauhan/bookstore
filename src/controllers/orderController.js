const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Book = require('../models/Book');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
    try {
        const {
            shippingAddress,
            paymentMethod
        } = req.body;

        // Get user's cart
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart || cart.items.length === 0) {
            res.status(400);
            throw new Error('No order items');
        }

        // Check stock and create order items
        const orderItems = [];

        for (const item of cart.items) {
            const book = await Book.findById(item.book);

            if (!book) {
                res.status(404);
                throw new Error(`Book not found: ${item.book}`);
            }

            if (book.stock < item.quantity) {
                res.status(400);
                throw new Error(`Not enough stock for book: ${book.title}`);
            }

            // Decrease stock
            book.stock -= item.quantity;
            await book.save();

            orderItems.push({
                book: item.book, // This is the ID
                quantity: item.quantity,
                price: item.price
            });
        }

        const order = new Order({
            orderItems: orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            totalPrice: cart.totalPrice
        });

        const createdOrder = await order.save();

        // Clear cart
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(201).json({ success: true, data: createdOrder });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate(
            'user',
            'name email'
        ).populate('orderItems.book', 'title coverImage');

        if (order) {
            // Check if admin or order owner
            // req.user._id is an objectId, order.user._id is objectId.
            if (req.user.role === 'admin' || order.user._id.toString() === req.user._id.toString()) {
                res.status(200).json({ success: true, data: order });
            } else {
                res.status(401);
                throw new Error('Not authorized to view this order');
            }
        } else {
            res.status(404);
            throw new Error('Order not found');
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private (Admin)
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name').sort('-createdAt');
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (Admin)
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (order) {
            order.status = status;

            if (status === 'Delivered') {
                order.deliveredAt = Date.now();
                order.isPaid = true; // Assuming POD or payment confirmed on delivery
                order.paidAt = Date.now();
            }

            const updatedOrder = await order.save();
            res.status(200).json({ success: true, data: updatedOrder });
        } else {
            res.status(404);
            throw new Error('Order not found');
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = {
    addOrderItems,
    getMyOrders,
    getOrderById,
    getOrders,
    updateOrderStatus
};
