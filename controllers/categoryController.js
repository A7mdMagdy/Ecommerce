const Category = require('../models/categoryModel');
const {
    createOne,
    updateOne,
    deleteOne,
    getOne,
    getAll,
} = require('./handlerFactory');

exports.createCategory = createOne(Category);

exports.updateCategory = updateOne(Category);

exports.deleteCategory = deleteOne(Category);

exports.getOneCategory = getOne(Category);

exports.getAllCategories = getAll(Category);