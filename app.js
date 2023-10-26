const passport = require('passport');
const express = require('express');
const session = require('express-session');
const authRouter = require('./routes/authRouts');
const categoryRoutes = require('./routes/categoryRoutes');
require('./auth');

const app = express();

app.use(session({ secret: 'Your_big_secret' }));
app.use(passport.initialize());
app.use(passport.session());

function isLoggedin(req, res, next) {
    console.log(req.user);
    req.user ? next() : res.sendStatus(401);
}

app.use('/', authRouter);
app.use('/api/v1/category', categoryRoutes);

module.exports = app;