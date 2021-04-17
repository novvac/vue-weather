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

export default router;