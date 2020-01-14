const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const jwtSecret="prakash";


router.post('/signup', (req, res, next) => {
    let Password = req.body.Password;
    bcrypt.hash(Password, 10, function (err, hash) {
        if (err) {
            let err =  new Error('Could not hash!');
		err.status = 500;
		return next(err);
        }
        User.create({
            FullName: req.body.FullName,
            Email: req.body.Email,
            Password: hash,
            PhoneNo: req.body.PhoneNo,
            SMS: req.body.SMS
        }).then((user) => {
            // let token = jwt.sign({ _id: user._id }, jwtSecrect);
            res.json({ status: "Signup success!" });
        }).catch(next);
    });
});

router.post('/login', (req, res, next) => {
    User.findOne({ Email: req.body.Email })
        .then((user) => {
            if (user == null) {
                let err = new Error('User not found!');
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.Password, user.Password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match!');
                            err.status = 401;
                            return next(err);
                        }
                        // let token = jwt.sign({ _id: user._id }, process.env.SECRET);
                        res.json({ status: 'Login success!' });
                    }).catch(next);
            }
        }).catch(next);
})

module.exports = router;