const express = require('express');
const router = express.Router();


// Load validation


// Load social model


////==== GET: ROUTES
////////////////////////////////////////

router.get('/', (req, res) => {
    res.send({message: 'get social'})
});


router.get('/match', (req, res) => {
    res.send({message: 'get social match'})
});


router.get('/friend', (req, res) => {
    res.send({message: 'get social friend'})
});


router.get('/message', (req, res) => {
    res.send({message: 'get social message'})
});




////==== POST: ROUTES
////////////////////////////////////////







module.exports = router;

