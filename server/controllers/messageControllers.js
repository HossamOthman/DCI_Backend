const messageModel = require("../models/Message");

exports.createMessage = async (req, res) => {
    try {
        const user = await messageModel.find({ user_id: req.body.user_id });

        if (user == null) {
            res.status(500).json({ message: "user not found !" });
        } else {
            const message = await messageModel.create({
                user_id: req.body.user_id,
                content: req.body.content,
                category: req.body.category,
                deleted: req.body.deleted
            });

            message.save();

            res.status(200).json({ message: "your message was added !" });
        }
    } catch (error) {
        res.status(500).json({ message: "error happend", error: error });
    }
};


exports.getMessage = async (req, res) => {

    try {
        const message = await messageModel.findById({ _id: req.body.id }).populate('user_id');

        if (message.deleted === false) {

            res.status(200).json({ message: message })

        } else {
            res.status(404).json({ message: "message are true" })
        }

    } catch (error) {

        res.status(400).json({ message: "error happend" })
    }
}




exports.getAllMessages = async (req, res) => {

    try {
        const message = await messageModel.find({ category: req.body.category, deleted: false }).populate('user_id').sort({'date': -1}).limit(5);

        // const allMessages = message.filter(item => {
        //     return item.deleted === false
        // });

        if (message.length == 0) {
            res.status(500).json({ message: "there is no messages"})
        } else {
            res.status(200).json({ message: message })
        }

    } catch (error) {

        res.status(400).json({ message: "error happend" , error: error.message })
    }
}

exports.editMessage = async (req, res) => {

    try {

        const message = await messageModel.findById(req.body.message_id);

        if (!message) {
            res.status(500).json({ message: "there is no message" })
        }

        if (message.user_id == req.body.user_id) {

            const editedMessage = await messageModel.findByIdAndUpdate(req.body.message_id,
                { content: req.body.content, dates: { last_edited: Date.now() } },
                { new: true })

            // let dateToConvert = new Date(editedMessage.dates.last_edited)
            // console.log(dateToConvert.toLocaleString())

            res.status(200).json({ message: "the message was edited", message: editedMessage })

        } else {
            res.status(400).json({ message: "the user id or message id does not match" })
        }

    } catch (error) {
        res.status(400).json({ message: "error happend", error: error.message })
    }
}


exports.deleteMessage = async (req, res) => {

    try {

        const message = await messageModel.findById(req.body.message_id);

        if (!message) {
            res.status(500).json({ message: "there is no message" })
        }

        if (message.user_id == req.body.user_id) {

            const editedMessage = await messageModel.findByIdAndUpdate(req.body.message_id,
                { deleted: true, dates: { last_edited: Date.now() } },
                { new: true })

            // let dateToConvert = new Date(editedMessage.dates.last_edited)
            // console.log(dateToConvert.toLocaleString())

            res.status(200).json({ message: "the message was edited", message: editedMessage })

        } else {
            res.status(400).json({ message: "the user id or message id does not match" })
        }

    } catch (error) {
        res.status(400).json({ message: "error happend", error: error.message })
    }
}