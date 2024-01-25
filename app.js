const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://vonhatnam:vonhatnam@cluster0.u60utzk.mongodb.net/Artwork_Platform')
  .then(() => {
    console.log('MongoDB connected...');
  })

const userRouter = require('./routes/userRouter');
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT + '...');
});