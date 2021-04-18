import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import keys from '../config/keys.js';

import User from '../models/User.js';

import validateRegister from '../validators/registerValidator.js';
import validateLogin from '../validators/loginValidator.js';

// @route POST api/auth/register
// @desc Register new user
// @access Public
router.post('/register', (req, res) => {
    // validate inputs
    const { errors, isValid } = validateRegister(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email}).then(doc => {
        if(doc) {
            return res.status(400).json({email: "Ten adres email został już wykorzystany!"});
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if(err)
                        return res.status(500).json(err);

                    const user = new User(req.body);

                    user.password = hash;

                    user.save();
                    return res.status(200).json('User was created!');
                })
            })
        }
    })
});

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post("/login", async (req, res) => {
    // validate inputs
    const { errors, isValid } = validateLogin(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }

    let user = await User.findOne({email: req.body.email});
    if(user) {
        bcrypt.compare(req.body.password, user.password).then(pwdCorrect => {
            if(pwdCorrect) {
                const payload = {
                    id: user.id
                };

                const token = jwt.sign(payload, keys.secretOrKey, {expiresIn: 1200});

                const {password, __v, _id, ...rest} = user._doc;

                res.cookie("token", token, {httpOnly: true, path: "/"});
                return res.status(200).json(rest);
            } else {
                res.status(400).json({password: "Hasło niepoprawne!"});
            }
        })
    } else {
        return res.status(404).json({email: "Konto z podanym adresem email nie istnieje!"});
    }
})

// @route POST api/auth/logout
// @desc Logout user
// @access Public
router.post("/logout", (req, res) => {
    res.cookie('token', null, {httpOnly: true, path: '/', maxAge: 0});
    return res.status(200).json('OK');
})

export default router;