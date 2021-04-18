import express from 'express';
const router = express.Router();
import passport from '../config/passport.js';

import User from '../models/User.js';

// @route GET api/user/
// @desc Get logged user
// @access Authenticated users
router.get("/", passport.authenticate("jwt", {session: false}), async (req, res) => {
    const {password, __v, _id, ...rest} = req.user._doc;
    return res.status(200).json(rest);
})

// @route POST api/user/city
// @desc Add watched city to logged user
// @access Authenticated users
router.post("/city", passport.authenticate("jwt", {session: false}), async (req, res) => {
    let user = await User.findById(req.user.id);

    if(!user.cities.includes(req.body.id)) {
        user.cities.push(req.body.id);
        await user.save();
    }

    return res.status(200).json('City was added');
})

export default router;