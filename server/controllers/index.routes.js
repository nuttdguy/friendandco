
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
 * [profile ops]
 * get one profile info, {options} : questions, hobbies, interest, photos, work, education
 * get one profile activity
 * add one activity, redirect to activity controller (ac)
 * update one activity, redirect to ac
 * delete one activity, redirect to ac
 * disband one activity, redirect to ac
 * get connections, redirect to connection controller, (cc)
 * get reputation, redirect to reputation controller, (rc)
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


// import controllers
const userController = require('./user.controller');
const activityController = require('./activity.controller');


module.exports = (app) => {

    /*****
     * [activity ops]
     * get one activity info, {options}
     * get many activity info, {options}
     * add one activity, {options}
     * update status of an activity, {options}
     * delete an activity
     * ****/
    const api_activity = '/api/activity';
    app.post(api_activity+'/new', activityController.newActivity);


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
    const api_user = '/api/user';
    app.post(api_user+'/register', userController.registerUser);
    app.post(api_user+'/login', userController.loginUser);
    app.post(api_user+'/reset-password', userController.resetPassword); // TODO finish
    app.get(api_user+'/activate/:userId', userController.activateUser); // TODO create + link user to profile
    app.get(api_user+'/:userId', userController.getUser);
    app.delete(api_user+'/:userId', userController.deleteUser);
    app.put(api_user+'/update', userController.updateUser);




};