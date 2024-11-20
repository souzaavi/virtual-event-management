const mongoose = require('mongoose');

const categories = require('../utils/constants/categories');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: categories,
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    /*validate: {
      validator: async function(value) {
        const user = await mongoose.model('User').findById(value);
        return user && user.role === 'event-organizer';
      },
      message: 'Only users with the role "event-organizer" can create events.',
    },*/
  },
}, {
  timestamps: true,
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

eventSchema.pre('save', async function (next) {
  const user = await mongoose.model('User').findById(this.createdBy);
  if (!user || user.role !== 'organizer') {
    return next(new Error('Only users with the role "event-organizer" can create events.'));
  }
  next();
});

const eventModel = mongoose.model('Event', eventSchema, 'Events');

module.exports = eventModel;
