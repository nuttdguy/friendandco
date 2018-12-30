// import repository
const { activityRepository } = require('../repository/index.repository');

// get activity; one
function getActivity(activityId) {

    try {
        return activityRepository.getActivity(activityId);
    } catch (e) {
        return e;
    }
}

// get activities; all
function getActivities() {

    try {
        return activityRepository.getActivities();
    } catch (e) {
        return e;
    }
}

// get kind; one
function getKind(kindId) {

    try {
        return activityRepository.getKind(kindId);
    } catch (e) {
        return e;
    }
}

// get kinds; all
function getKinds() {

    try {
        return activityRepository.getKinds();
    } catch (e) {
        return e;
    }
}

// get scene; one
function getScene(sceneId) {

    try {
        return activityRepository.getScene(sceneId);
    } catch (e) {
        return e;
    }
}

// get scenes; all
function getScenes() {

    try {
        return activityRepository.getScenes();
    } catch (e) {
        return e;
    }
}

// get tag; one
function getTag(tagId) {

    try {
        return activityRepository.getTag(tagId);
    } catch (e) {
        return e;
    }
}

// get tags; all
function getTags() {

    try {
        return activityRepository.getTags();
    } catch (e) {
        return e;
    }
}

// add new activity
function newActivity(activityData) {

    // TODO validate data
    try {
        return activityRepository.newActivity(activityData)
    } catch (e) {
        return e;
    }
}

// add new kind; of activity
function newKind(newKindData) {

    try {
        return activityRepository.newKind(newKindData);
    } catch (e) {
        return e;
    }
}

// add new scene; of activity
function newScene(newSceneData) {

    try {
        return activityRepository.newScene(newSceneData);
    } catch (e) {
        return e;
    }
}

// add new tag; of activity
function newTag(newTagData) {

    try {
        return activityRepository.newTag(newTagData);
    } catch (e) {
        return e;
    }
}


module.exports = {
    getActivity,
    getActivities,
    getKind,
    getKinds,
    getScene,
    getScenes,
    getTag,
    getTags,
    newActivity,
    newKind,
    newScene,
    newTag,
};