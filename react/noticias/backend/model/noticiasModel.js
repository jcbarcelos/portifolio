const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  const PostSchema = new Schema({
    title: {type: String, match: /[a-z]/, required: true},
    description: {type: String, required: true},
    date: {type: Date, default: Date.now },
    buff: Buffer
  })

  module.exports = mongoose.model('Posts', PostSchema)