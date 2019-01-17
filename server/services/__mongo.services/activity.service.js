// LOAD MODULES



// LOAD MODEL
///////////////////////////////

const {
    Activity,
    ActivityScene,
    ActivityKind,
    ActivityTag,
    ActivityCalendar,
    Place,
    Photo } = require('../../dto/__mongo_models/__index.model');


// QUERY OPTIONS
///////////////////////////////


// TRANSACTION OBJECTS & QUERIES
///////////////////////////////

// EXAMPLE
// Transaction.find({username : profile.username})
//     .select('uniqueId confirmation_link item_name timeout username')
//     .exec(function(err, txs) {
//         console.log(txs);
//     });


// QUERIES :: GET
///////////////////////////////

const findAllActivities = async () => {
    return await Activity.find({});
};

const findAllActivityTags = async () => {
    return await ActivityTag.find({});
};


// MANIPULATION :: SAVE
///////////////////////////////

const saveActivity = (activityData) => {
    const activity = createNewActivity(activityData);
    return activity.save();
};


const saveActivityTag = (tagData) => {
    const activityTag = createNewActivityTag(tagData);
    return activityTag.save();
};


const saveActivityKind = (kindData) => {
    const activityKind = createNewActivityKind(kindData);
    return activityKind.save();
};


const saveActivityScene = (sceneData) => {
    const activityScene = createNewActivityScene(sceneData);
    return activityScene.save();
};


const saveActivityPlace = (placeData) => {
    const activityPlace = createNewPlace(placeData);
    return activityPlace.save();
};



// MANIPULATION :: UPDATE
///////////////////////////////




// MANIPULATION :: DELETE
///////////////////////////////





// SERVICES :: MISC
///////////////////////////////





// SERVICES :: USING EXTERNAL LIBRARIES
///////////////////////////////





// PRIVATE FUNCTIONS
///////////////////////////////

// TODO implement profile id, pass into request object
function createNewActivity(activityData) {
    const actTag = createNewActivityTag(activityData),
        cal = createNewActivityCalendar(activityData),
        place = createNewPlace(activityData),
        photo = createNewPhoto(activityData);


    // TODO requires logic to filter incoming data, locating the scene or creating a new one
    // NOTE create a new calender document so that a different calendar can be associated with same event
    return new Activity({
        scene: {label: 'outdoor', desc: 'do stuff in nature'},
        kind: {label: 'sports', desc: 'an activity that requires above normal movements'},
        title: activityData.title,
        desc: activityData.desc,
        createBy: activityData.userId,
        tags: [actTag],
        location: {
            address1: activityData.address1,
            address2: activityData.address2,
            city: activityData.city,
            state: activityData.state,
            zip: activityData.zip,
            type: activityData.type
        },
        place: place,
        calendar: cal,
        photos: [photo]
    });
}


function createNewActivityScene(sceneData) {
    return new ActivityScene({
        label: sceneData.label,
        desc: sceneData.desc
    })
}


function createNewActivityKind(kindData) {
    return new ActivityKind({
        label: kindData.label,
        desc: kindData.desc
    })
}


function createNewActivityTag(tagData) {
    return new ActivityTag({
        label: tagData.label
    })
}


function createNewActivityCalendar() {
    return new ActivityCalendar({

    })
}


function createNewPlace(placeData) {
    console.log(placeData);
    return new Place({
        // country: 'usa',
        place: {
            name: placeData.name,
            lat: placeData.lat,
            long: placeData.long,
            address1: placeData.address1,
            address2: placeData.address2,
            city: placeData.city,
            state: placeData.state,
            zip: placeData.zip
        }
    })
}


function createNewPhoto() {
    return new Photo({

    })
}


// EXPORT REFERENCES
///////////////////////////////

module.exports = {
    findAllActivities,
    findAllActivityTags,
    saveActivity,
    saveActivityPlace,
    saveActivityScene,
    saveActivityTag,
    saveActivityKind,

};