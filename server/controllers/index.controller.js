const api = 'api/auth';

module.exports = (app) => {


    app.use(api+'/user', require('./user.controller'));

};