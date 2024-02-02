const express = require('express');
const router = express.Router();

const OrderItemController = require('../Controller/orderItemController')

router.get("/", OrderItemController.getAllOrderItems);

router.get("/:id", OrderItemController.getOrderItemById);

router.post("/", OrderItemController.postNewOrderItem);

router.put("/:id", OrderItemController.updateOrderItem);

router.delete("/:id", OrderItemController.deleteOrderItem);

module.exports = router