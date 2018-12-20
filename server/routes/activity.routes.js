const express = require('express');
const router = express.Router();



const { activityService } = require('../services/__index.service');


////==== GET: ROUTES
////////////////////////////////////////

router.get('/', async (req, res, next) => {
    const activities = await activityService.findAllActivities();
   res.send(activities).end();
});


router.get('/category', (req, res, next) => {
    res.send({message: 'get activity category'})
});


router.get('/category', (req, res, next) => {
    res.send({message: 'get activity mob'})
});



////==== POST: ROUTES
////////////////////////////////////////













module.exports = router;













