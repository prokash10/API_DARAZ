const mongoose=require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema=new mongoose.Schema({
    FullName: {
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        minlength:10,
        index:true,
        unique:true,
        trim:true
    },
    Password:{
        type: String,
        required: true,
        minLength:5,
        trim: true
    },
    PhoneNo: {
        type:Number,
        required:true
    },
    SMS: {
        type:Number,
        required:true
    }
});

//user authentication
UserSchema.statics.verifyUser = (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        let err = new Error('Bearer token is not set');
        err.status = 401;
        return next(err);
    }
    let token = authHeader.split(' ')[1];
    let data;
    try {
        data = jwt.verify(token, jwtSecret);
    } catch (err) {
        throw new Error('Token could not be verified!');
    }
    User.findById(data._id)
        .then((user) => {
            req.user = user;
            next();
        })
}

const User=mongoose.model('User',UserSchema);
module.exports=User;
