// FOR ROUTES THAT REQUIRE AUTHORIZED ACCESS; E.G. REGISTERED USER


// IMPORT SERVICES :: URL: API/AUTH/ACTIVITY



// VALIDATION



// UTILS



// MODEL :: FOR TESTING



// TEST ROUTES



// GET ROUTES
////////////////////////////////////////////

//=====|| all activities
router.get('/', (req, res, next) => {

});

//=====|| activity by id
router.get('/:actId', (req, res, next) => {

});

//=====|| new activity form
router.get('/new', (req, res, next) => {

});

//=====|| get update form
router.get('/:actId/edit', (req, res, next) => {

});


// POST ROUTES
////////////////////////////////////////////


//=====|| new activity
router.post('/new', (req, res, next) => {

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



//=====|| EXPORT ROUTER

module.exports = router;