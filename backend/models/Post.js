const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  name: String,
  email: String,
  rollNo: String,
  department: String,
  age: String
});

module.exports = mongoose.model('Post', PostSchema);
