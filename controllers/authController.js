const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync')
exports.isLoggedin= function (req,res,next){
    req.user ? next():res.sendStatus(401);
}
exports.create = catchAsync( async (req,res,next) =>{
    const user = await User.findOne({email:req.user.email})
    if(!user){
    const newUser = await User.create({
        name: req.user.displayName,
        email: req.user.email,
        password,
        passwordConfirm
      });
    }
    //   await newUser.save({ validateBeforeSave: false });
  
      next()
})