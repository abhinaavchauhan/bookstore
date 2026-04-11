const express = require('express');
const router = express.Router();
const {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
} = require('../controllers/bookController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
    .get(getBooks)
    .post(protect, admin, upload.single('image'), createBook);

router.route('/:id')
    .get(getBook)
    .put(protect, admin, upload.single('image'), updateBook)
    .delete(protect, admin, deleteBook);

module.exports = router;
