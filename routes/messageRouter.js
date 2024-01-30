const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const mongoose = require('mongoose')

const Message = require('../models/message.js')
const MessageController = require('../controller/messageController.js')

router.get('/getMessage', MessageController.getAllMessages)

router.post('/postMessage', MessageController.postNewMessage)

router.get('getMessageById/:id', MessageController.findMessageById)

router.patch('updateMessage/:id', MessageController.updateMessage)

router.delete('deleteMessage/:id', MessageController.deleteMessage)

module.exports = router