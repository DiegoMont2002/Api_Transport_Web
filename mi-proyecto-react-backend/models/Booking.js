const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
    required: true
  },
  departureDate: {
    type: Date,
    required: [true, 'La fecha de salida es requerida']
  },
  returnDate: {
    type: Date
  },
  passengers: {
    adults: {
      type: Number,
      required: true,
      min: [0, 'El número de adultos no puede ser negativo']
    },
    children: {
      type: Number,
      default: 0,
      min: [0, 'El número de niños no puede ser negativo']
    },
    seniors: {
      type: Number,
      default: 0,
      min: [0, 'El número de adultos mayores no puede ser negativo']
    }
  },
  totalPrice: {
    type: Number,
    required: [true, 'El precio total es requerido']
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'paypal', 'cash', 'transfer'],
    required: [true, 'El método de pago es requerido']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);