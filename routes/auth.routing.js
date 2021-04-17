import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';

import User from '../models/User.js';

import validateRegister from '../validators/registerValidator.js';

// @route POST api/auth/register
// @desc Register new user
// @access Public
router.post('/register', (req, res) => {
    // validate inputs
    const { errors, isValid } = validateRegister(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({userName: req.body.userName}).then(doc => {
        if(doc) {
            return res.status(400).json({userName: "Użytkownik o takiej nazwie już istnieje!"});
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
router.post("/login", (req, res) => {
    res.status(200).json("ok");
})

export default router;