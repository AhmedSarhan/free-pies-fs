const mongoose = require('mongoose');


mongoose.connection.on('open', () => {
  console.log('Mongoose is connected!');
});

mongoose.connection.on('error', (err) => {
  console.log(err, 'Mongoose failed to connect');
});

const connectDb = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    // useFindAndModify: false
  });
};

module.exports = connectDb;