const express = require('express');
const authController = require('../controllers/authController');
passport = require('passport');

const router = express.Router();

router.get('/auth/google',passport.authenticate('google', { scope:[ 'email', 'profile' ] }));

router.get( '/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/landing',
        failureRedirect: '/failure'
}));

router.get('/landing',authController.isLoggedin,authController.create,(req,res)=>{
    res.send('Hello')
})

router.get('/failure',(req,res)=>{
    res.send('Something went wrong!')
})

module.exports = router