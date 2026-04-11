const User = require('../models/User');
const Book = require('../models/Book');
const Order = require('../models/Order');

// @desc    Get system analytics
// @route   GET /api/admin/analytics
// @access  Private (Admin)
const getAnalytics = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalBooks = await Book.countDocuments();
        const totalOrders = await Order.countDocuments();

        // Calculate total sales
        const orders = await Order.find({ isPaid: true });
        const totalSales = orders.reduce((acc, order) => acc + order.totalPrice, 0);

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalBooks,
                totalOrders,
                totalSales
            }
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAnalytics
};
