// import entities
const {
    Education,
    Hobby,
    Interest,
    Location,
    Photo,
    Work
} = require('../dto/index.dto');



// get education; all
async function getEducations(userId) {
    try {
        return await Education.findAll(
            {where: {id: userId}});
    } catch (e) {
        return e;
    }
}

// get hobbies; all
async function getHobbies(userId) {
    try {
        return await Hobby.findAll(
            {where: {id: userId}});
    } catch (e) {
        return e;
    }
}

// get interests; all
async function getInterests(userId) {
    try {
        return await Interest.findAll(
            {where: {id: userId}});
    } catch (e) {
        return e;
    }
}

// get location; all
async function getLocations(userId) {
    try {
        return await Location.findAll(
            {where: {id: userId}});
    } catch (e) {
        return e;
    }
}

// get photos; all
async function getPhotos(userId) {
    try {
        return await Photo.findAll(
            {where: {id: userId}});
    } catch (e) {
        return e;
    }
}


// get work; all
async function getWorks(userId) {
    try {
        return await Work.findAll(
            {where: {id: userId}});
    } catch (e) {
        return e;
    }
}


// export functions
module.exports = {
    getEducations,
    getHobbies,
    getInterests,
    getLocations,
    getPhotos,
    getWorks,
};