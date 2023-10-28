const express = require('express');
const {
    createCategory,
    updateCategory,
    deleteCategory,
    getOneCategory,
    getAllCategories,
} = require('../controllers/categoryController');

const router = express.Router();

router.
    route('/').
    get(getAllCategories).
    post(createCategory);

router.
    route('/:id').
    patch(updateCategory).
    get(getOneCategory).
    delete(deleteCategory);

module.exports = router;