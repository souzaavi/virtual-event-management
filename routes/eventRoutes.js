const express = require('express');

const verifyToken = require('../middlewares/verifyToken');
const authorize = require('../middlewares/authorize');

const { retrieveEvents, createEvent, modifyEvent, registerForEvent } = require('../controllers/eventsController');

const router = express.Router();


router.get('/', verifyToken, retrieveEvents);

router.post('/', verifyToken, authorize('admin', 'organizer'), createEvent);

router.put('/:id', verifyToken, authorize( 'organizer'), modifyEvent);

router.delete('/:id', verifyToken, authorize('organizer'), retrieveEvents);

router.post('/:id/register', verifyToken, registerForEvent);

module.exports = router;
