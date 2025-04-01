const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre de la ruta es requerido'],
    unique: true
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida']
  },
  from: {
    type: String,
    required: [true, 'El origen es requerido']
  },
  to: {
    type: String,
    required: [true, 'El destino es requerido']
  },
  distance: {
    type: Number,
    required: [true, 'La distancia es requerida']
  },
  duration: {
    type: String,
    required: [true, 'La duración es requerida']
  },
  price: {
    type: Number,
    required: [true, 'El precio es requerido']
  },
  stops: [{
    name: String,
    description: String,
    images: [{
      public_id: String,
      url: String
    }]
  }],
  featuredImage: {
    public_id: String,
    url: String
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Route', routeSchema);