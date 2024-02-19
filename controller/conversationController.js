const createError = require('http-errors')
const mongoose = require('mongoose')
const Conversation = require('../models/conversation.js')

module.exports = {
    getAllConversation: async (req, res, next) => {
        try {
            const data = await Conversation.find({})
            res.send(data)
        } catch (error) {
            console.log(error.message)
        }
    },
}