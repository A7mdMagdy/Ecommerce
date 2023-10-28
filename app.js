const passport = require('passport')
const express = require('express')
const session = require('express-session')
const authRouter = require('./routes/authRouts')
const userRouter = require('./routes/userRouts')
require('./auth')
const app = express()
app.use(session({secret:'Your_big_secret'}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json({ limit: '10kb' }));
app.use('/api/users',authRouter)
app.use('/api/users',userRouter)
module.exports = app;