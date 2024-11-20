const express = require('express');
const router = express.Router();

const { signupUser, loginUser } = require('../controllers/userController');
const verifyToken = require("../middlewares/verifyToken");
const {retrieveEvents} = require("../controllers/eventsController");
const authorize = require("../middlewares/authorize");

/***
  * @route POST /signup
 */
router.post('/signup', signupUser);

router.post('/login', loginUser);

router.get('/events', verifyToken, retrieveEvents);

module.exports = router;
