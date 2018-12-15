const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// Load models
const {
    Activity,
    ActivityCalendar,
    ActivityKind,
    ActivityScene,
    ActivityTag,
    Location,
    City,
    State,
    Profile,
    Education,
    Hobby,
    Interest,
    User,
    Work,
    WorkDetail,
    Photo
} = require('../../models/index.model');


// construct models
const photo = new Photo({
    url: './dir/imgs'
});

const user = new User({
    username: 'saraflakes',
    firstName: 'sara',
    lastName: 'flakes',
    email: 'saraflakes@example.com',
    photos: [photo],
    validationUrl: 'https://someurl.com/hash',
    activeDate: Date.now(),
    password: {
        token: 'some hash',
        isActive: true
    }
});

const actScene = new ActivityScene({
    label: 'Outdoor',
    desc: 'Activity that happens outdoors',
    timesUsed: 1,
    createBy: user._id
});

const actKind = new ActivityKind({
    label: 'event',
    desc: 'an event outdoors',
    timesUsed: 0,
    createBy: user._id
});

const actTag = new ActivityTag({
    label: 'fun',
    timesUsed: 0,
    createBy: user._id
});

const city = new City({
    desc: 'Oakland'
});

const state = new State({
    descShort: 'CA',
    descLong: 'California'
});

const location = new Location({
    // TODO add country object
    address1: '123 some street',
    address2: 'apt 210',
    city: city,
    state: state,
    zipcode: 94777
});

const calendar = new ActivityCalendar({
    isTimeEvent: true,
    beginCal: {
        year: 2019,
        month: 5,
        day: 10
    },
    endCal: {
        year: 2019,
        month: 5,
        day: 10
    },
    beginTime: {
        hour: 8,
        min: 30,
        period: 0
    },
    endTime: {
        hour: 9,
        min: 0,
        period: 0
    }
});

const activity = new Activity({
    scene: actScene,
    kind: actKind,
    title: 'lets hang outdoors',
    desc: 'its sunny, lets go hangout outdoors',
    createBy: user._id,
    tags: [actTag],
    location: location,
    calendar: calendar,
    photos: [photo]
});

const education = new Education({
    schoolName: 'Berkeley',
    degreeType: 'Bachelors'
});

const hobby = new Hobby({
    desc: 'programming',
    isActive: true,
    createBy: user._id
});

const interest = new Interest({
    desc: 'code challenges',
    isActive: true,
    createBy: user._id
});

const profile = new Profile({
    user: user._id,
    educations: [education],
    interests: [interest],
    hobbies: [hobby],
    locations: [location],
    createDate: Date.now()
});


// model route and output

router.get('/activity', (req, res) => {
    return res.send(activity);
});


router.get('/profile', (req, res) => {
    return res.send(profile);
});

module.exports = router;



