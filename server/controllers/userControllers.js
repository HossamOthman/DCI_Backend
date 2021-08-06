const userModel = require('../models/User');
const bcrypt = require('bcrypt');
const authHelper = require('../helpers/jwtIssuer');
const jwt = require('jsonwebtoken');


exports.userRegister = async (req, res) => {
    try {
        const userName = await userModel.find({ username: req.body.username });

        if (userName == null) {

            res.status(400).json({ message: 'user exists !!' })

        } else {
            const hashPassword = await bcrypt.hash(req.body.password, 10);

            const userData = await userModel.create({
                username: req.body.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                ip: req.ip,
                hash: hashPassword
            })

            userData.save();

            res.status(200).json({ message: "user added !", user: userData })

        }

    } catch (error) {
        res.status(500).json({ message: "error happened", error: error })
    }
}



exports.login = async (req, res) => {

    const user = await userModel.findOne({ username: req.body.username })

    if (user === null) {
        return res.status(400).json({ message: "user does not exist" })
    }
    try {

        const checkPassword = await bcrypt.compare(req.body.password, user.hash)

        if (checkPassword) {

            const token = authHelper.generateToken(user);
            console.log('the token Is ', token);
            jwt.verify(token, process.env.SECRETKEY, (err, user) => {
                if (err) console.log("there was an error")
                console.log('the content ', user)
            })
            return res.status(200).json({ message: 'user logged in', token: token, user: user })


            // res.status(200).json({message: "logged in", user: user})
        }

        res.status(400).json({ message: "user or password does not match" })

    } catch (error) {

        res.status(500).json({ message: "error happend", error: error.message })

    }
}