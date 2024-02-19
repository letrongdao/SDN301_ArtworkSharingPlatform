const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/signup', userController.userSignUp);

router.post('/login', userController.userLogin);

router.get('/', userController.getAllUsers);

router.post('/', userController.createNewUser);

router.get('/:id', userController.findUserById);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;