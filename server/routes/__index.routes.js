
// NOTE: passing app into index, otherwise would have to define each route within index.js
module.exports = (app) => {

    app.use('/api/activity', require('./activity.routes'));
    app.use('/api/auth/activity', require('./activity.routes.auth'));
    app.use('/api/auth/user', require('./user.routes.auth'));
    app.use('/api/auth/profile', require('./profile.routes.auth'));
    app.use('/api/auth/social', require('./social.routes.auth'));
    app.use('/api/auth/model', require('./__modelroute.test/modelroute.test'));

};