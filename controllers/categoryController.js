const Category = require('../models/categoryModel');
const {
    updateOne,
    getOne,
    getAll,
} = require('./handlerController');
const Store = require('../models/storeModel.js');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createCategory = catchAsync(async (req, res, next) => {
    if (!req.body.storeId) {
        return next(new AppError('Please insert the store ID for this category', 400));
    }

    const newCategory = await Category.create(req.body);

    await Store.findByIdAndUpdate(req.body.storeId, { $push: { categories: newCategory._id } }, {
        new: true
    });

    res.status(201).json({
        status: 'success',
        data: newCategory
    });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
        return next(new AppError('No document found with that ID', 404));
    }

    const store = await Store.findOne({ categories: req.params.id });
    const categoryIndex = store.categories.indexOf(req.params.id);
    if (categoryIndex !== -1) {
        store.categories.splice(categoryIndex, 1);
        await store.save();
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});

exports.updateCategory = updateOne(Category);

exports.getOneCategory = getOne(Category);

exports.getAllCategories = getAll(Category);