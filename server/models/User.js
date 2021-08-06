const mongoose = require("mongoose");

const {generateRobohashAvatar} = require('../helpers/avatar'); 

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String },
    ip: { type: String },
    hash: { type: String, required: true },
    avatar: { type: String, default: generateRobohashAvatar() },
    dates: {
        registered: { type: Date, default: Date.now() },
        last_active: { type: Date }
    },
    messages: { type: Number },
});
const User = mongoose.model("user", UserSchema); 
module.exports = User;
