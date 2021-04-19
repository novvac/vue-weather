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
            img: "https://source.unsplash.com/1080x1920/?city,village",
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

// @route PUT api/user/city/:id
// @desc Update city
// @access Authenticated users
router.put('/city/:id', passport.authenticate("jwt", {session: false}), async (req, res) => {
    let { cities } = req.user;
    const index = cities.map(el => el.id).indexOf(req.params.id);
    cities[index].img = req.body.img;

    await User.findOneAndUpdate({_id: req.user.id}, {cities}, {useFindAndModify: false});

    return res.status(200).json("City updated");
})

export default router;