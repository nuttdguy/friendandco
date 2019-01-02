
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
 * join, lead, leave a matched activity
 *
 *
 * [peer + connection ops]
 * get activity peers, {options}
 * add activity peers, {options}
 * update activity peers, {options}
 * delete activity peers, {options},
 * rate activity peers
 *
 *
 * [history ops]
 * get one user + many history info; of joined, matched, leave
 * get one user + one history info; of joined, matched, leave
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
const profileController = require('./profile.controller');

// TODO refactor all routes; use url to reduce redundant routes + operations
module.exports = (app) => {

    /*****
     * [activity ops]
     * get one activity info, {options}
     * get many activity info, {options}
     * add one activity, {options}
     * update status of an activity, {options}
     * delete an activity
     * ****/
    const api_activity = '/api/activities';
    app.get(api_activity+'/', activityController.getActivities);
    app.get(api_activity+'/kinds', activityController.getKinds);
    app.get(api_activity+'/scenes', activityController.getScenes);
    app.get(api_activity+'/tags', activityController.getTags);

    app.get(api_activity+'/q=:id', activityController.getActivity);
    app.get(api_activity+'/kinds/q=:id', activityController.getKind);
    app.get(api_activity+'/scenes/q=:id', activityController.getScene);
    app.get(api_activity+'/tags/q=:id', activityController.getTag);

    app.post(api_activity+'/', activityController.newActivity);
    app.post(api_activity+'/kinds', activityController.newKind);
    app.post(api_activity+'/scenes', activityController.newScene);
    app.post(api_activity+'/tags', activityController.newTag);

    // note: update payloads will have id and original data
    app.put(api_activity+'/', activityController.updateActivity);
    app.put(api_activity+'/kinds', activityController.updateKind);
    app.put(api_activity+'/scenes', activityController.updateScene);
    app.put(api_activity+'/tags', activityController.updateTag);

    app.delete(api_activity+'/q=:id', activityController.deleteActivity);
    app.delete(api_activity+'/kinds/q=:id', activityController.deleteKind);
    app.delete(api_activity+'/scenes/q=:id', activityController.deleteScene);
    app.delete(api_activity+'/tags/q=:id', activityController.deleteTag);



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
    const api_user = '/api/users';
    app.post(api_user+'/register', userController.registerUser);
    app.post(api_user+'/login', userController.loginUser);
    app.post(api_user+'/reset-password', userController.resetPassword); // TODO finish
    app.get(api_user+'/activate/:userId', userController.activateUser); // TODO create + link user to profile
    app.get(api_user+'/:userId', userController.getUser);
    app.delete(api_user+'/:userId', userController.deleteUser);
    app.put(api_user+'/update', userController.updateUser);


    /*****
     * [profile ops]
     * get one profile info, {options} : questions, hobbies, interest, photos, work, education
     * get one profile activity
     * add one activity, redirect to activity controller (ac)
     * update one activity, redirect to ac
     * delete one activity, redirect to ac
     * disband one activity, redirect to ac
     * get connections, redirect to connection controller, (cc)
     * get reputation, redirect to reputation controller, (rc)
     * ****/
    const api_profile = '/api/profiles';
    // app.get(api_profile+'/questions', profileController);
    // app.get(api_profile+'/hobbies', profileController);
    // app.get(api_profile+'/interests', profileController);
    // app.get(api_profile+'/photos', profileController);
    // app.get(api_profile+'/work', profileController);
    // app.get(api_profile+'/education', profileController);
    // app.get(api_profile+'/activities', profileController);
    //
    // app.get(api_profile+'/q=:id', profileController);
    // app.get(api_profile+'/activities/q=:id', profileController);
    //
    // app.post(api_profile+'/activities', profileController);
    //
    // app.put(api_profile+'/activities', profileController);
    //
    // app.delete(api_profile+'/activities/q=:id', profileController);


};