const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderItemSchema = new Schema({
    orderItemId: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    artworkId: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const OrderItem = mongoose.model('orderitem', OrderItemSchema);

module.exports = OrderItem