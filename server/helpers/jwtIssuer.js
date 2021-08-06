const jwt = require('jsonwebtoken');


exports.generateToken = (user) => {


    return jwt.sign({
        sub: user._id,
        // iat: Date.now()
    }, process.env.SECRETKEY, {expiresIn: '15s'})
}