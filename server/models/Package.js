const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  destination: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  itinerary: {
    type: [String], // array of daily plans
    default: [],
  },
  images: {
    type: [String], // array of image URLs
    default: [],
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Package', PackageSchema);