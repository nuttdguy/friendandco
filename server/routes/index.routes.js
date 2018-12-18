
// NOTE: passing app into index, otherwise would have to define each route within index.js
module.exports = (app) => {

    app.use('/api/activity', require('./activity.routes'));
    app.use('/api/auth/activity', require('./activity.routes'));
    app.use('/api/auth/user', require('./auth.user.routes'));
    app.use('/api/auth/profile', require('./auth.profile.routes'));
    app.use('/api/auth/social', require('./auth.social.routes'));
    app.use('/api/auth/model', require('./__modelroute.test/modelroute.test'));

};