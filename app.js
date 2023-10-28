const express = require('express');
const passport = require('passport');
const session = require('express-session');
const authRouter = require('./routes/authRouts');
const userRouter = require('./routes/userRouts');
const categoryRoutes = require('./routes/categoryRoutes');
const globalErrorHandler = require('./controllers/errorController');
require('./auth');

const app = express();

app.use(session({ secret: 'Your_big_secret' }));

app.use(express.json({ limit: '10kb' }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', authRouter);
app.use('/api/users', userRouter);
app.use('/api/categories', categoryRoutes);

// Handle requests from wrong urls
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//Using global error handling middleware
app.use(globalErrorHandler);

module.exports = app;