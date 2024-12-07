const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const CustomError = require("../utils/CustomError");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, {
  timestamps: true,
  toObject: {
    virtuals: true,
  },
  toJSON: {
    transform: (doc, ret) => {
      delete ret.password;
      const id = ret._id;
      delete ret._id;
      delete ret.createdAt;
      delete ret.updatedAt;
      return {id, ...ret};
    },
  }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (e) {
    next(e);
  }
});

userSchema.post('save', async function (error, doc, next) {
  console.log(error);
  if(error) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      next(new CustomError(400, ['Email already exists']));
    } else {
      next(new CustomError(500, ['Internal Server Error']));
    }
  }
  next();
});

userSchema.virtual('events', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'createdBy',
});

userSchema.methods.authenticate = async function (password) {
  const status = await bcrypt.compare(password, this.password);
  if(typeof status !== 'boolean') {
    console.error(status);
    throw new CustomError(500, ['Internal Server error']);
  }
  if (!status) {
    throw new CustomError(404, ['Invalid credentials']);
  }
  return jwt.sign({id: this._id, email: this.email, name: this.name, role: this.role}, process.env.JWT_SECRET, {expiresIn: '1h',});
};

userSchema.virtual('registrations', {
  ref: 'Registration',
  localField: '_id',
  foreignField: 'user',
});

module.exports = mongoose.model('User', userSchema, 'Users');
