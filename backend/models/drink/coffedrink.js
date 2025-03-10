const mongoose = require("mongoose");

const coffeDrinkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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

module.exports = mongoose.model("coffeDrinkSchema", coffeDrinkSchema);
