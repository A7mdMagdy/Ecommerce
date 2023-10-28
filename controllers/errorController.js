const AppError = require('../utils/appError');

const handleCastError = err => {
    const message = `Invalid ${err.path}:${err.value}`;
    return new AppError(message, 400);
};

const handleDuplicateFields = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value:${value} , please use another value`;

    return new AppError(message, 400);
};

const handleValidationError = err => {
    const errors = Object.values(err.errors).map(ele => ele.message);

    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};

const handleExpiredTokenError = () => new AppError('Expired token, please login again!', 401);

const handleTokenError = () => new AppError('Invalid token, please login!', 401);


const devError = (res, err) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

const prodError = (res, err) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    } else {
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        });
    }
};

const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        devError(res, err);
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };
        if (err.name === 'CastError') error = handleCastError(err);
        if (err.code === 11000) error = handleDuplicateFields(err);
        if (err.name === 'ValidationError') error = handleValidationError(err);
        if (err.name === 'JsonWebTokenError') error = handleTokenError();
        if (err.name === 'TokenExpiredError') error = handleExpiredTokenError();
        prodError(res, error);
    }

    next();
};

module.exports = globalErrorHandler;