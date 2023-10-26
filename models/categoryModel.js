const mongoose = require('mongoose');
const AppError = require('../utils/AppError');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'There is another category using the same name'],
        trim: true,
        required: [true, 'The category must have a name'],
    },
    description: {
        type: String,
        minlength: [8, 'The description must be at least 8 characters'],
        trim: true,
        required: [true, 'The category must have a description'],
    },
    products: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Product'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
});

categorySchema.pre('findOneAndUpdate', function (next) {
    this._update.updatedAt = Date.now();

    next();
});

categorySchema.pre('findOneAndDelete', function (next) {
    if (this.products.length > 0) {
        return next(new AppError('This category contains a products', 400));
    }

    next();
});

categorySchema.pre(/^findOne/, function (next) {
    this.populate('products');

    next();
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;