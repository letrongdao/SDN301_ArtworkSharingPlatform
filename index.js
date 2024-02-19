const express = require('express')
const mongoose = require('mongoose')
const createError = require('http-errors')

const app = express()

app.use(express.json())

require('./initDB')()

app.all('/test', (req, res) => {
    // console.log(req.query)
    // console.log(req.query.text)
    // res.send(req.query)
    // console.log(req.params)
    // res.send(req.params)
    console.log(req.body)
    res.send(req.body)
})

const MessageRoute = require('./routes/messageRouter.js')
app.use('/message', MessageRoute)

const userRouter = require('./routes/userRouter.js');
app.use('/users', userRouter);

const CommentRoute = require('./routes/commentRouter.js')
app.use('/comments', CommentRoute)

const artworkRouter = require("./routes/artworkRouter.js");
app.use("/artwork", artworkRouter);

const OrderRoute = require('./routes/orderRouter.js')
app.use('/orders', OrderRoute)

const ConversationRoute = require('./routes/conversationRouter.js')
app.use('/conversation', ConversationRoute)

app.use((req, res, next) => {
    next(createError(404, "Not found"))
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

app.listen(8080, () => {
    console.log('Server started on port 8080')
})