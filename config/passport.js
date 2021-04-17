import passport from 'passport';
import passportJwt from 'passport-jwt';
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
import User from '../models/User.js';
import keys from '../config/keys.js';

let tokenExtractorFromCookie = function(req) {
    let token = null;
    if(req && req.cookies) {
        token = req.cookies["token"];
    }
    return token;
}

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromExtractors([tokenExtractorFromCookie]);
opts.secretOrKey = keys.secretOrKey;

passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
                if(user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => {
                console.log(err);
            })
    })
)

export default passport;