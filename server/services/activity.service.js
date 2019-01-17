// import repository
const { activityRepository } = require('../repository/index.repository');

// delete activity; one
function deleteActivity(activityId) {

    try {
        return activityRepository.deleteActivity(activityId);
    } catch (e) {
        return e;
    }
}

// delete kind; one
function deleteKind(kindId) {

    try {
        return activityRepository.deleteKind(kindId);
    } catch (e) {
        return e;
    }
}

// delete scene; one
function deleteScene(sceneId) {

    try {
        return activityRepository.deleteScene(sceneId);
    } catch (e) {
        return e;
    }
}

// delete tag; one
function deleteTag(tagId) {

    try {
        return activityRepository.deleteTag(tagId);
    } catch (e) {
        return e;
    }
}

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

// update activity
function updateActivity(activityData) {

    try {
        return activityRepository.updateActivity(activityData)
    } catch (e) {
        return e;
    }
}

// update kind
function updateKind(newKindData) {

    try {
        return activityRepository.updateKind(newKindData);
    } catch (e) {
        return e;
    }
}

// update scene
function updateScene(newSceneData) {

    try {
        return activityRepository.updateScene(newSceneData);
    } catch (e) {
        return e;
    }
}

// update tag
function updateTag(newTagData) {

    try {
        return activityRepository.updateTag(newTagData);
    } catch (e) {
        return e;
    }
}

// export functions
module.exports = {
    deleteActivity,
    deleteKind,
    deleteScene,
    deleteTag,
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
    updateActivity,
    updateKind,
    updateScene,
    updateTag,
};