const mongoose = require('mongoose');

const uri = 'mongodb+srv://naymyo1310mdy:NayMyo177643@cluster0.h7iou.mongodb.net/';

const connectDb = async () => {
  await  mongoose.connect(uri, { serverSelectionTimeoutMS: 30000 })
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log(err));
}
module.exports = {connectDb}