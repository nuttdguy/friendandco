// import repository
const { activityRepository } = require('../repository/activity.repository');


// add new activity
async function newActivity(activityData) {

    // TODO validate data
    try {
        return await activityRepository.newActivity(activityData)
    } catch (e) {
        return e;
    }
}


module.exports = {
    newActivity
};