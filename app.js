const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors')

const app = express();

app.use(express.json())

require('./initDB.js')()

const userRouter = require('./routes/userRouter.js');
app.use('/users', userRouter);

app.use((req, res, next) => {
  next(createError(404, 'Not found'));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});

app.listen(5000, () => {
  console.log('Server started on port 5000')
})