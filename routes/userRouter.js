const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/', userController.getAllUsers);

router.post('/', userController.createNewUser);

router.get('/:id', userController.findUserById);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;