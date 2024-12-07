const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  status: {
    type: String,
    enum: ['registered', 'attended', 'cancelled'],
    default: 'registered',
  },
}, {
  toObject: {
    virtuals: true,
  },
  toJSON: {
    transform: (doc, ret) => {
      const id = ret._id;
      delete ret._id;
      return {id, ...ret};
    },
  }
});

registrationSchema.virtual('eventDetails', {
  ref: 'Event',
  localField: 'event',
  foreignField: '_id',
  justOne: true,
});

registrationSchema.virtual('userDetails', {
  ref: 'User',
  localField: 'user',
  foreignField: '_id',
  justOne: true,
});

const registrationModel = mongoose.model('Registration', registrationSchema, 'Registrations');

module.exports = registrationModel;
