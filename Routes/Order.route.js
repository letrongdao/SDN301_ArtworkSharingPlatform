const express = require('express');
const router = express.Router();

const OrderController = require('../Controller/orderController')

router.get("/", OrderController.getAllOrders);

router.get("/:id", OrderController.getOrderById);

router.post("/", OrderController.postNewOrder);

router.put("/:id", OrderController.updateOrder);

router.delete("/:id", OrderController.deleteOrder);

module.exports = router