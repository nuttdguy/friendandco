// IMPORT LIBRARIES
const express = require('express');
const router = express.Router();


// IMPORT SERVICES :: URL: API/AUTH/ACTIVITY


// VALIDATION



// UTILS



// MODEL :: FOR TESTING


// TEST ROUTES

router.get('/test', (req, res, next) => {

    return res.send('test get route');
});

router.post('/test', (req, res, next) => {

    return res.send('test post route');
});


// GET ROUTES
////////////////////////////////////////////

//=====|| all activities
router.get('/', (req, res, next) => {
    return res.send('get all activities route')
});

//=====|| activity by id
router.get('/:actId', (req, res, next) => {

});

//=====|| new activity form
router.get('/new', (req, res, next) => {

});


//=====|| get update form
router.get('/:actId/edit', (req, res, next) => {
    // TODO may not need to exist with react F.E.
});




// POST ROUTES
////////////////////////////////////////////


//=====|| new activity
router.post('/new', async (req, res, next) => {
    const activityData = req.body;

    const result = await activityService.saveActivity(activityData);
    console.log(result);
    return res.send(result);
});


//=====|| new activity tag
router.post('/tag/new', async (req, res, next) => {
   const tagData = req.body;

   const result = await activityService.saveActivityTag(tagData);
   res.send(result);
});


//=====|| new activity kind
router.post('/kind/new', async (req, res, next) => {
    const kindData = req.body;

    const result = await activityService.saveActivityKind(kindData);
    res.send(result);
});


//=====|| new activity scene
router.post('/scene/new', async (req, res, next) => {
    const sceneData = req.body;

    const result = await activityService.saveActivityScene(sceneData);
    res.send(result);
});


//=====|| new activity place
router.post('/place/new', async (req, res, next) => {
    const placeData = req.body;

    const result = await activityService.saveActivityPlace(placeData);
    res.send(result);
});



// PUT ROUTES
////////////////////////////////////////////

//=====|| update activity
router.put('/:actId/edit', (req, res, next) => {

});


// DELETE ROUTES
////////////////////////////////////////////

//=====|| delete activity
router.delete('/:actId/delete', (req, res, next) => {

});

console.log('Done loading activity auth routes ... ');

//=====|| EXPORT ROUTER

module.exports = router;