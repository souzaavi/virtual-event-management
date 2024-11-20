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
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
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
});

const registrationModel = mongoose.model('Registration', registrationSchema, 'Registrations');

module.exports = registrationModel;
