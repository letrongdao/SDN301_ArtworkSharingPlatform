const express = require('express')
const router = express.Router()
const commentController = require('../controller/commentController')

router.get('/', commentController.getAllComments)

router.post('/', commentController.postNewComment)

router.get('/:id', commentController.findCommentById)

router.patch('/:id', commentController.updateComment)

router.delete('/:id', commentController.deleteComment)

module.exports = router