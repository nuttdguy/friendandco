
/*****
 * [user ops]
 * get one users info, {options}
 * add one user
 * update one user info
 * activate a users account
 * delete a users account
 *
 *
 * [activity ops]
 * get one activity info, {options}
 * get many activity info, {options}
 * add one activity, {options}
 * update status of an activity, {options}
 * delete an activity
 *
 *
 * [persona ops]
 * get one persona info, {options}
 * get many persona info, {options}
 * add one persona, {options}
 * update one persona info
 * delete one persona info
 *
 *
 * [match ops]
 * get matches for one user, {options} : activity only, activity + persona, etc
 *
 *
 * [peer ops]
 * get activity peers, {options}
 * add activity peers, {options}
 * update activity peers, {options}
 * delete activity peers, {options}
 *
 *
 * [history ops]
 * get one user + many history info
 * get one user + one history info
 *
 *
 * [system ops]
 * grade user, {options}
 * match users, {options}
 *
 *
 * [admin ops]
 * get one activity, {displayOptions}
 * get many activities, {displayOptions}
 * add activity, {options}
 * update activity, {options}
 * delete activity
 *
 * */


const api_user = '/api/user';
const api_activity = '/api/activity';
const userController = require('./user.controller');

module.exports = (app) => {

    /*****
     * [user ops]
     * get one users info -- (pending test)
     * add one user -- (pending test)
     * update one user info -- (pending test)
     * activate a users account -- (pending test)
     * login user -- (pending test)
     * register user -- (pending test)
     * delete a users account -- (pending test)
     * ****/
    app.post(api_user+'/register', userController.registerUser);
    app.post(api_user+'/login', userController.loginUser);
    app.post(api_user+'/reset-password', userController.resetPassword); // TODO finish
    app.get(api_user+'/activate/:userId', userController.activateUser);
    app.get(api_user+'/:userId', userController.getUser);
    app.delete(api_user+'/:userId', userController.deleteUser);
    app.put(api_user+'/update', userController.updateUser);


    /*****
     * [activity ops]
     * get one activity info, {options}
     * get many activity info, {options}
     * add one activity, {options}
     * update status of an activity, {options}
     * delete an activity
     * ****/
    app.post(api_activity+'/new', activityController.registerActivity);


};