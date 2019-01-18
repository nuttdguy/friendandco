// Require db connection
const db = require('../db/db.connection');
const genUUID4 = db.sequelize.genUUID4;


// Load models
const {
    Activity,
    ActivityKind,
    ActivityScene,
    ActivityTag,
} = db.sequelize.models;


// delete activity; one
function deleteActivity(activityId) {
    console.log('deleting activity by id ... ', activityId);
    return Activity.destroy({where: {id: activityId}});
}

// delete kind; one
function deleteKind(kindId) {
    console.log('deleting kind by id ... ', kindId);
    return ActivityKind.destroy({where: {id: kindId}});
}

// delete scene; one
function deleteScene(sceneId) {
    console.log('deleting scene by id ... ', sceneId);
    return ActivityScene.destroy({where: {id: sceneId}});
}

// delete tag; one
function deleteTag(tagId) {
    console.log('deleting tag by id ... ', tagId);
    return ActivityTag.destroy({where: {id: tagId}});
}

// get activity; one
function getActivity(activityId) {
    console.log('getting activity by id ... ');
    return Activity.findOne({where: {id: activityId}});
}

// get activity; all
function getActivities() {
    console.log('getting all activities ... ');
    return Activity.findAll({});
}

// get kind; one
function getKind(kindId) {
    console.log('getting kind by id ... ', kindId);
    return ActivityKind.findOne({where: {id: kindId}})
}

// get kind; all
function getKinds() {
    console.log('getting all kinds ... ', ActivityKind);
    return ActivityKind.findAll({});
}

// get scene; one
function getScene(sceneId) {
    console.log('getting scene by id ... ', sceneId);
    return ActivityScene.findOne({where: {id: sceneId}})
}

// get scene; all
function getScenes() {
    console.log('getting all scenes ... ');
    return ActivityScene.findAll({});
}

// get tag; one
function getTag(tagId) {
    console.log('getting tag by id ... ', tagId);
    return ActivityTag.findOne({where: {id: tagId}})
}

// get tag; all
function getTags() {
    console.log('getting all tags ...');
    return ActivityTag.findAll({});
}

// create new activity
async function newActivity(activityData) {
    try {
        const activity = await buildActivity(activityData);

        console.log('saving activity ... ');
        return activity.save();
    } catch (e) {
        return e;
    }
}

// add new kind; of activity
async function newKind(newKindData) {
    try {
        const kind = await buildKind(newKindData);

        console.log('saving kind ... ');
        return kind.save();
    } catch (e) {
        return e;
    }
}

// add new scene; of activity
async function newScene(newSceneData) {
    try {
        const scene = await buildScene(newSceneData);

        console.log('saving scene ... ');
        return scene.save();
    } catch (e) {
        return e;
    }
}

// add new tag; of activity
async function newTag(newTagData) {
    try {
        const tag = await buildTag(newTagData);

        console.log('saving tag ... ');
        return tag.save();
    } catch (e) {
        return e;
    }
}

// update activity; one
async function updateActivity(activityData) {
    try {
        console.log('updating activity ... ', activityData.id);
        return Activity.update(
            { ...activityData },
            { where: {id: activityData.id}
        });
    } catch (e) {
        return e;
    }
}

// update kind; one
async function updateKind(kindData) {
    try {
        console.log('updating kind ... ', kindData.id);
        return ActivityKind.update(
            { ...kindData },
            { where: {id: kindData.id}
        });
    } catch (e) {
        return e;
    }
}

// update scene; one
async function updateScene(sceneData) {
    try {
        console.log('updating scene ... ', sceneData.id);
        return ActivityScene.update(
            { ...sceneData },
            { where: {id: sceneData.id}
        });
    } catch (e) {
        return e;
    }
}

// update tag; one
async function updateTag(tagData) {
    try {
        console.log('updating tag ... ', tagData.id);
        return ActivityTag.update(
            { ...tagData },
            { where: {id: tagData.id}
        });
    } catch (e) {
        return e;
    }
}



//=========================\\
//====||   build    ||=====\\
//=========================\\

// build activity
function buildActivity(activityData) {
    return Activity.build({
        id: genUUID4(),
        title: activityData.title,
        city: activityData.city,
        state: activityData.state,
        zip: activityData.zip,
        address1: activityData.address1,
        address2: activityData.address2,
        latitude: activityData.latitude,
        longitude: activityData.longitude,
        beginDate: activityData.beginDate,
        endDate: activityData.endDate,
        beginTime: activityData.beginTime,
        endTime: activityData.endTime,
        url: activityData.url,
        isActive: activityData.isActive,
        createdBy: activityData.createdBy
    })
}

// build kind
function buildKind(kindData) {

    console.log('building kind ... ');
    return ActivityKind.build({
        id: genUUID4(),
        label: kindData.label,
        desc: kindData.desc,
        timesUsed: 0,
        isActive: true,
        createdBy: kindData.createdBy
    })
}

// build scene
function buildScene(sceneData) {

    console.log('building scene ... ');
    return ActivityScene.build({
        id: genUUID4(),
        label: sceneData.label,
        desc: sceneData.desc,
        timesUsed: 0,
        isActive: true,
        createdBy: sceneData.createdBy
    })
}

// build tag
function buildTag(tagData) {

    console.log('building tag ... ');
    return ActivityTag.build({
        id: genUUID4(),
        label: tagData.label,
        timesUsed: 0,
        isActive: true,
        createdBy: tagData.createdBy
    });
}


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