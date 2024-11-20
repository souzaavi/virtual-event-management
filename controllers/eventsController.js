const Event = require('../models/Event');
const Registration = require('../models/Registration');

const CustomError = require("../utils/CustomError");

const eventSchema = require('../schemas/eventSchema');


const createEvent = async (req, res, next) => {
  try {
    const {error, value} =  eventSchema.validate(req.body, {abortEarly: false});
    if(error) return next(new CustomError(400, error.details.map(e => e.message)));
    const event = await Event.create({...value, createdBy: req.user.id, });
    if(!event) return next(new CustomError(500, ['Something went wrong']));
    res.status(201).json({message: "Successfully created event."});
  } catch (e) {
    console.log(e);
    next(e);
  }
}

const retrieveEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

const modifyEvent = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {error, value} = eventSchema.fork(Object.keys(eventSchema.describe().keys), schema => schema.optional()).validate(req.body, {abortEarly: false});
    if(error) return next(new CustomError(400, error.details.map(e => e.message)));

    const event = await Event.findById(id);
    if(!event) return next(new CustomError(404, ['Event not found']));
    if(event.createdBy.toString() !== req.user.id) return next(new CustomError(403, ['You are not authorized to modify this event']));
    const status = await event.updateOne({...value});
    console.log(status);
    if(!event) return next(new CustomError(403, ['Either the event does not' +
    ' exist or you are not authorized to modify']));
    res.status(201).json({message: "Successfully created event."});
  } catch (e) {
    console.log(e);
    next(e);
  }
}

const deleteEvent = async (req, res, next) => {
  try {
    const {id} = req.params;
    const event = await Event.findById(id);
    if(!event) return next(new CustomError(404, ['Event not found']));
    if(event.createdBy.toString() !== req.user.id) return next(new CustomError(403, ['You are not authorized to delete this event']));
    const status = await event.deleteOne();
    if(!status) return next(new CustomError(500, ['Something went wrong']));
    res.status(200).json({message: "Successfully deleted event."});
  } catch (e) {
    console.error(e);
    next(e);
  }
}


const registerForEvent = async (req, res, next) => {
    try {
      const {id} = req.params;
      const registration = await Registration.create({user: req.user.id, event: id});
      if(!registration) return next(new CustomError(500, ['Something went wrong']));
      res.status(201).json({message: "Successfully registered for event."});
    } catch (e) {
      console.error(e);
      next(e);
    }
}


module.exports = {
  createEvent,
  modifyEvent,
  deleteEvent,
  retrieveEvents,
  registerForEvent,
}
