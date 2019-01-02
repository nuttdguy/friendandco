// import service
const { profileService } = require('../services/index.service');


// get eduction; all
async function getEducations(req, res, next) {
    const userId = req.id;
    try {
        const result = await profileService.getEducations(userId);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
}

// get hobbies; all
async function getHobbies(req, res, next) {
    const userId = req.id;
    try {
        const result = await profileService.getHobbies(userId);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
}

// get interests; all
async function getInterests(req, res, next) {
    const userId = req.id;
    try {
        const result = await profileService.getInterests(userId);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
}

// get location; all
async function getLocations(req, res, next) {
    const userId = req.id;
    try {
        const result = await profileService.getLocations(userId);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
}

// get photos; all
async function getPhotos(req, res, next) {
    const userId = req.id;
    try {
        const result = await profileService.getPhotos(userId);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
}

// get work; all
async function getWorks(req, res, next) {
    const userId = req.id;
    try {
        const result = await profileService.getWorks(userId);
        res.status(200).json(result);
    } catch (e) {
        next(e);
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