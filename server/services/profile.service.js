// import service
const { profileRepository } = require('../repository/index.repository');

// get education; all
function getEducations(userId) {
    try {
        return profileRepository.getEducations(userId);
    } catch (e) {
        return e;
    }
}

// get hobbies; all
function getHobbies(userId) {
    try {
        return profileRepository.getHobbies(userId);
    } catch (e) {
        return e;
    }
}


// get interests; all
function getInterests(userId) {
    try {
        return profileRepository.getInterests(userId);
    } catch (e) {
        return e;
    }
}


// get location; all
function getLocations(userId) {
    try {
        return profileRepository.getLocations(userId);
    } catch (e) {
        return e;
    }
}


// get photos; all
function getPhotos(userId) {
    try {
        return profileRepository.getPhotos(userId);
    } catch (e) {
        return e;
    }
}

// get work; all
function getWorks(userId) {
    try {
        return profileRepository.getWorks(userId);
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