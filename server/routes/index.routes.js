
// NOTE: passing app into index, otherwise would have to define each route within index.js
module.exports = (app) => {

    app.use('/api/user', require('./userauth.routes'));
    app.use('/api/profile', require('./profile.routes'));
    app.use('/api/activity', require('./activity.routes'));
    app.use('/api/social', require('./social.routes'));
    app.use('/api/model', require('./__modelroute.test/modelroute.test'));

};

// module.exports = {
//
//     userAuth: require('./userauth.routes'),
//     profile: require('./profile.routes'),
//     activity: require('./activity.routes'),
//     social: require('./social.routes'),
//     modeltest: require('./__modelroute.test/modelroute.test')
//
// };