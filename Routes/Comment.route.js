const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const mongoose = require('mongoose')

const Comment = require('../Models/comment')
const CommentController = require('../Controllers/CommentController')

router.get('/', CommentController.getAllComments)

router.post('/', CommentController.postNewComment)

router.get('/:id', CommentController.findCommentById)

router.patch('/:id', CommentController.updateComment)

router.delete('/:id', CommentController.deleteComment)

module.exports = router