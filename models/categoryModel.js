const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'There is another category using the same name'],
        trim: true,
        required: [true, 'The category must have a name'],
    },
    description: {
        type: String,
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

// categorySchema.pre(/^findOne/, function (next) {
//     this.populate('products');

//     next();
// });

categorySchema.pre('findOneAndUpdate', function (next) {
    this._update.updatedAt = Date.now();

    next();
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;