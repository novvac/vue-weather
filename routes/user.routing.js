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
    let cityExist = false;

    for(let city of user.cities) {
        if(city.id === req.body.id) {
            cityExist = true;
            break;
        }
    }

    if(!cityExist) {
        user.cities.push({
            id: req.body.id,
            city: req.body.city,
            country: req.body.country,
            img: "https://images.unsplash.com/photo-1618542314664-c078e8463ed3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjE4NzUxNzcz&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=720",
            coord: req.body.coord,
        });
        await user.save();
    } else {
        return res.status(304).json("Not modified");
    }

    return res.status(200).json('City was added');
})

// @route DELETE api/user/city/:id
// @desc Remove city from watched
// @access Authenticated users
router.delete('/city/:id', passport.authenticate("jwt", {session: false}), async (req, res) => {
    let user = await User.findById(req.user.id);
    user.cities.splice(user.cities.map(el => el.id).indexOf(req.params.id), 1);
    
    await user.save();

    return res.status(200).json("City deleted");
})

export default router;