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