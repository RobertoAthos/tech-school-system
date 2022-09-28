const {createEvent,getAevent,deleteEvent,getAllEvents} = require('../controller/eventsListController') 
const express = require('express')
const router = express.Router()


router.get("/events/admin", getAllEvents);
router.get("/events/admin/:id", getAevent);
router.post("/events/new/admin", createEvent);
router.delete("/events/admin/:id", deleteEvent);

module.exports = router;