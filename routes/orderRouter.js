const express = require('express');
const orderController = require('../controller/orderController.js');
const router = express.Router();


router.get("/", orderController.getAllOrders);

router.get("/:id", orderController.getOrderById);

router.post("/", orderController.postNewOrder);

router.put("/:id", orderController.updateOrder);

router.delete("/:id", orderController.deleteOrder);

module.exports = router