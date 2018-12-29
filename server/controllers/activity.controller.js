// import service
const { activityService } = require('../services/index.service');


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


module.exports = {
    newActivity,
};