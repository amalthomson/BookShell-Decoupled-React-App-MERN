// server/Models/Product.js
const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  pc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ISBN: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  publicationDate: {
    type: Date,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Product = model('Product', productSchema);

module.exports = Product;
