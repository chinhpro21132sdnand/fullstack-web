const mongoose = require("mongoose");

const noodleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  price: {
    type: Number,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    minlength: 2,
    maxlength: 255,
  },
  dateto: {
    type: Date,
    required: true,
  },
  datefrom: {
    type: Date,
    required: true,
  },
  supplier: {
    type: String,
    required: true,
  },
  isActive: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("noodleSchema", noodleSchema);
