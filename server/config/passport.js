const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { User } = require('../models');
const KEYS = require('./keys');



const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKeyProvider = KEYS.SECRET_JWT_KEY;


module.exports = (passport) => {

    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {

            try {
                const user =  await User.findByPk(jwt_payload.id);
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            } catch(err) {
                console.log(err)
            }
        })
    );

};