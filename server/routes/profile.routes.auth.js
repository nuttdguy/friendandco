const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation



// Load models
const Profile = require('../models/__mongo_models/profile/Profile.schema');
const User = require('../models/__mongo_models/profile/User.schema');
const Interest = require('../models/__mongo_models/profile/Interest.schema');
const Hobby = require('../models/__mongo_models/profile/Hobby.schema');
const Location = require('../models/__mongo_models/place/Place.schema');
const City = require('../models/__mongo_models/place/City.schema');
const State = require('../models/__mongo_models/place/State.schema');


////==== GET: TEST
////////////////////////////////////////

router.get('/testmodels', (req, res) => {
    let userObject = new User({firstName: 'Sara', lastName: 'Flakes'});
    const interestOne = new Interest({desc: 'swimming'});
    const interestTwo = new Interest({desc: 'walking'});
    const hobby1 = new Hobby({desc: 'learning'});
    const city = new City({desc: 'Oakland'});
    const state = new State({desc: 'CA', });
    const location = new Location(
        {
            address1: '1111 some street',
            address2: 'apt 210',
            city: city,
            state: state
        });

    let profileObject = new Profile(
        {
            user: userObject,
            interests: [
                interestOne,
                interestTwo],
            hobbies: [
                hobby1
            ],
            locations: [location]
        }
    );

    return res.send(profileObject);
});



////==== GET: ROUTES
////////////////////////////////////////


router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    const errors = {};

    Profile.findOne({user: req.user.id})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }

            res.json(profile);

        })
        .catch(err => res.status(404).json(err));

});



router.get('/identity/:user_id', (req, res) => {
    const errors = {};

    Profile.findOne({user: req.params.user_id})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => res.status(404).json({profile: 'There is no profile for this user'}));
});



router.get('/match', (req, res) => {
    res.send({message: 'get profile match'})
});



router.get('/social', (req, res) => {
    res.send({message: 'get profile social'})
});



router.get('/personal-tags', (req, res) => {
    res.send({message: 'get profile personal tags'})
});



router.get('/activity-tags', (req, res) => {
    res.send({message: 'get profile activity tags'})
});



router.get('/value-tags', (req, res) => {
    res.send({ message: 'get profile value tags'})
});



router.get('/peer-tags', (req, res) => {
    res.send({message: 'get profile peer tags'})
});


////==== POST: ROUTES
////////////////////////////////////////





module.exports = router;




















