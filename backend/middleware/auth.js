const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

//check is user authenticated 
exports.isAuthenticated = async (req, res, next) => {
    const {token} = req.cookies;

    //make sure token exists 

    if (!token) {
        return next(new ErrorResponse('Not authorized to access this route', 401));

    }

    try{
        //verify token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
req.user = await User.findById(decoded.id);

next();

    }catch(error) {
        return next(new ErrorResponse('Not authorized to access this route', 401));

    }
}

// middleware for admin
exports.isAdmin = (req, res, next) =>{
    if(req.user.role=== 0) {
        return next(new ErrorResponse ('Acess denied , you must a admin', 401));

    } 
     next();
}