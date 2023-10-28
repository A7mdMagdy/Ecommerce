const express = require('express');
const authController = require('../controllers/authController');
passport = require('passport');

const router = express.Router();
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);

router.get('/auth/google',passport.authenticate('google', { scope:[ 'email', 'profile' ] }));

router.get( '/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/api/users/landing',
        failureRedirect: '/api/users/failure'
}));

router.get('/landing',authController.isLoggedin,(req,res)=>{
    res.send('Hello')
})

router.get('/failure',(req,res)=>{
    res.send('Something went wrong!')
})

module.exports = router