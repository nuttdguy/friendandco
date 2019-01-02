// import entities

const {
    Activity,
    Kind,
    Scene,
    Tag,
    genUUID4
} = require('../dto/index.dto');


// delete activity; one
function deleteActivity(activityId) {
    console.log('deleting activity by id ... ', activityId);
    return Activity.destroy({where: {id: activityId}});
}

// delete kind; one
function deleteKind(kindId) {
    console.log('deleting kind by id ... ', kindId);
    return Kind.destroy({where: {id: kindId}});
}

// delete scene; one
function deleteScene(sceneId) {
    console.log('deleting scene by id ... ', sceneId);
    return Scene.destroy({where: {id: sceneId}});
}

// delete tag; one
function deleteTag(tagId) {
    console.log('deleting tag by id ... ', tagId);
    return Tag.destroy({where: {id: tagId}});
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
    return Kind.findOne({where: {id: kindId}})
}

// get kind; all
function getKinds() {
    console.log('getting all kinds ... ');
    return Kind.findAll({});
}

// get scene; one
function getScene(sceneId) {
    console.log('getting scene by id ... ', sceneId);
    return Scene.findOne({where: {id: sceneId}})
}

// get scene; all
function getScenes() {
    console.log('getting all scenes ... ');
    return Scene.findAll({});
}

// get tag; one
function getTag(tagId) {
    console.log('getting tag by id ... ', tagId);
    return Tag.findOne({where: {id: tagId}})
}

// get tag; all
function getTags() {
    console.log('getting all tags ...');
    return Tag.findAll({});
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
        return Kind.update(
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
        return Scene.update(
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
        return Tag.update(
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
        id: Activity.genUUID4(),
        scene: activityData.scene,
        kind: activityData.kind,
        title: activityData.title,
        beginDate: activityData.beginDate,
        endDate: activityData.endDate,
        beginTime: activityData.beginTime,
        endTime: activityData.endTime,
        minActor: activityData.minActor,
        maxActor: activityData.maxActor
    })
}

// build kind
function buildKind(kindData) {

    console.log('building kind ... ');
    return Kind.build({
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
    return Scene.build({
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
    return Tag.build({
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