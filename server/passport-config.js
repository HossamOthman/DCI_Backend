const passportJWT = require('passport-jwt');
const userModel = require('./models/User');
const JWTSrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;


function initialize(passport) {
    passport.use('myJwt', new JWTSrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRETKEY
    },
        function (jwtPayload, done) {
            return userModel.findById(jwtPayload.sub)
                .then(user => { return done(null, user) })
                .catch(err => { return done(err) })
        }
    ))
}

module.exports = initialize;