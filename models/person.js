const mongoose = require('mongoose');

const { Schema } = mongoose;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 0, max: 100 },
  email: String,
});

module.exports = mongoose.model('people', personSchema);
