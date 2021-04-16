import express from 'express';
const router = express.Router();

// @route POST api/auth/register
// @desc Register new user
// @access Public
router.post('/register', (req, res) => {
    // validate inputs
    const { errors, isValid } = validateRegisterInputs(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }

    // check if user is exist and (if not) create new
    User.findOne({userName: req.body.userName}).then(doc => {
        if(doc) {
            return res.status(400).json({userName: "Użytkownik o takiej nazwie już istnieje!"});
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    const user = new User(req.body);

                    user.password = hash;

                    user.save();
                    return res.status(200).json({user: user});
                })
            })
        }
    })
});

export default router;