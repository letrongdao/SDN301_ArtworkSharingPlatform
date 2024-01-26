const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    orderId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true,
    },
    createTime: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
})

const Order = mongoose.model('order', OrderSchema);

module.exports = Order