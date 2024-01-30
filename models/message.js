const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema(
    {
        from_userId: {
            type: String,
            required: true
        },
        to_userId: {
            type: String,
            required: true
        },
        conversationId: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
    }, {
    timestamps: true
}
);

const Message = mongoose.model('message', messageSchema);

module.exports = Message