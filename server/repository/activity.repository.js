// import entities

const { Activity } = require('../dto/index.dto');


async function newActivity(activityData) {
    try {
        const activity = await buildActivity(activityData);
        return activity.save();
    } catch (e) {
        return e;
    }
}


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


module.exports = {
    newActivity
};