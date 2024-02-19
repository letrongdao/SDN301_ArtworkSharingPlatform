const mongoose = require('mongoose')
const Schema = mongoose.Schema

const conversationSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        userId_1: {
            type: String,
            required: true
        },
        userId_2: {
            type: String,
            required: true
        },
    }, {
    timestamps: true
}
);

const Conversation = mongoose.model('conversation', conversationSchema);

module.exports = Conversation