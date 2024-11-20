const User = require('../models/user');
const {signupSchema, loginSchema} = require('../schemas/userSchema');
const CustomError = require("../utils/CustomError");

const loginUser = async (req, res, next) => {
  try {
    const {error, value} = loginSchema.validate(req.body, {abortEarly: false});
    if(error) next(new CustomError(400, error.details.map(er => er.message)));
    const user = await User.findOne({email: value.email});
    const token = await user.authenticate(value.password);
    if(!token) return next(new CustomError(500, ['Internal Server Error']))
    res.status(200).json({user, token});
  } catch (e) {
    next(e);
  }
}


const signupUser = async (req, res, next) => {
  try {
    const {error, warning, value} = signupSchema.validate(req.body, {abortEarly: false,});
    if(error) {
      return next(new CustomError(404, error.details.map(er => er.message)))
    }
    const user = await User.create({...value});
    if(!user) return next(new CustomError(500, ['Something went wrong']));
    res.status(201).json({message: "Successfully registered."})
  } catch (e) {
    next(e);
  }
};

module.exports = {
  loginUser,
  signupUser,
}
