// import service
const { activityService } = require('../services/index.service');


// get activity; one
async function getActivity(req, res, next) {
    const activityId = req.params.actId;
    console.log(req.params);

    try {
        const result = await activityService.getActivity(activityId);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
}

// get activities; all
async function getActivities(req, res, next) {

    try {
        const result = await activityService.getActivities();
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }

}

// get kind; one
async function getKind(req, res, next) {
    const kindId = req.params.id;

    try {
        const result = await activityService.getKind(kindId);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
}

// get kinds; all
async function getKinds(req, res, next) {

    try {
        const result = await activityService.getKinds();
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
}

// get scene; one
async function getScene(req, res, next) {
    const sceneId = req.params.id;

    try {
        const result = await activityService.getScene(sceneId);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
}

// get scenes; all
async function getScenes(req, res, next) {
    try {
        const result = await activityService.getScenes();
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
}

// get tag; one
async function getTag(req, res, next) {
    const tagId = req.params.id;
    console.log(tagId);
    try {
        const result = await activityService.getTag(tagId);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
}

// get tags; all
async function getTags(req, res, next) {

    try {
        const result = await activityService.getTags();
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
}

// add new activity
async function newActivity(req, res, next) {
    const activityData = req.body;

    try {
        const result = await activityService.newActivity(activityData);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
}

// add new kind; of activity
async function newKind(req, res, next) {
    const newKindData = req.body;

    try {
        const result = await activityService.newKind(newKindData);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
}

// add new scene; of activity
async function newScene(req, res, next) {
    const newSceneData = req.body;

    try {
        const result = await activityService.newScene(newSceneData);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
}

// add new tag; of activity
async function newTag(req, res, next) {
    const newTagData = req.body;

    try {
        const result = await activityService.newTag(newTagData);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
}

// export functions
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