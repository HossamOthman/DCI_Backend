const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    content: { type: String, required: true },
    dates: {
        created: { type: Date, default: Date.now() },
        last_edited: Date
    },
    category: { type:String, enum:["alex", "mohamad", "saif", "hössam", "firas"] },
    deleted: { type: Boolean }
});

const Message = mongoose.model("message", MessageSchema);

module.exports = Message;
