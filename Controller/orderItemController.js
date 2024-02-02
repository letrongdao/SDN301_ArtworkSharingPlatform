const createError = require('http-errors');
const mongoose = require('mongoose');
const OrderItem = require('../Models/orderItem');

module.exports = {
    getAllOrderItems: async(req, res, next) => {
        try {
            const results = await OrderItem.find({}, { __v: 0 });

            res.send(results);
        }
        catch(err) {
            console.log(err.message);
        }
    },

    getOrderItemById: async(req, res, next) => {
        try {
            const id = req.params.id;
            const results = await OrderItem.findById(id);

            if (results) {
                res.send(results);
            }
            else {
                throw createError(404, "OrderItem does not exist!")
            }
        }
        catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                return next(createError(400, 'Invalid OrderItem Id'))
            }
        }
    },

    postNewOrderItem: async(req, res, next) => {
        try {
            const orderItem = new OrderItem(req.body);
            const result = orderItem.save();

            res.send(result);
        }
        catch (error) {
            console.log(error.message);
        }
    },

    updateOrderItem: async(req, res, next) => {
        try {
            const id = req.params.id;
            const update = new OrderItem(req.body);
            const options = {new: true};

            const result = await OrderItem.findByIdAndUpdate(id, update, options);

            if (!result) {
                throw createError(404, "OrderItem does not exist!");
            }
            else {
                res.send(result);
            }
        }
        catch(error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                return next(createError(400, 'Invalid OrderItem Id'))
            }
        }
    },

    deleteOrderItem: async(req, res, next) => {
        try {
            const id = req.params.id;
            const result = await OrderItem.findByIdAndDelete(id);

            if (!result) {
                throw createError(404, "OrderItem does not exist!");
            }
            else {
                res.send(result);
            }
        }
        catch(error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                return next(createError(400, 'Invalid OrderItem Id'));
            }
        }
    }
}