
/*****
 * [profile ops]
 * get one users info, {options}
 * add one profile
 * update one profile info
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
 * get matches for one profile, {options} : activity only, activity + persona, etc
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
 * get one profile + many history info; of joined, matched, leave
 * get one profile + one history info; of joined, matched, leave
 *
 *
 * [system ops]
 * grade profile, {options}
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


// import routes
const userController = require('./user.controller');
const activityController = require('./activity.controller');
const profileController = require('./profile.controller');

module.exports = (app) => {

    /*****
     * [activity ops]
     * get one activity info, {options}
     * get many activity info, {options}
     * add one activity, {options}git branch
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
     * add one profile -- (pending test)
     * update one profile info -- (pending test)
     * activate a users account -- (pending test)
     * login profile -- (pending test)
     * register profile -- (pending test)
     * delete a users account -- (pending test)
     * ****/
    const api_user = '/api/users';
    app.post(api_user+'/signup', userController.signup);
    app.post(api_user+'/login', userController.loginUser);
    app.post(api_user+'/reset-password', userController.resetPassword); // TODO finish
    app.get(api_user+'/activate/:userId', userController.activateUser); // TODO create + link profile to profile
    app.get(api_user+'/:userId', userController.getUser);
    app.delete(api_user+'/:userId', userController.deleteBy);
    app.put(api_user+'/update', userController.updateUser);


    /*****
     * [profile ops]
     * get one profile info, {options} : questions, hobbies, interest, photos, work, education
     * ****/
    const api_profile = '/api/profiles';
    app.get(api_profile+'/profile=:id', profileController.getProfile);
    app.get(api_profile+'/profile=:id/education', profileController.getEducations);
    app.get(api_profile+'/profile=:id/hobbies', profileController.getHobbies);
    app.get(api_profile+'/profile=:id/interests', profileController.getInterests);
    app.get(api_profile+'/profile=:id/location', profileController.getLocations);
    app.get(api_profile+'/profile=:id/photos', profileController.getPhotos);
    app.get(api_profile+'/profile=:id/work', profileController.getWorks);


    // app.get(api_profile+'/q=:id', profileController);
    // app.get(api_profile+'/activities/q=:id', profileController);

    // app.post(api_profile+'/activities', profileController);

    // app.put(api_profile+'/activities', profileController);

    // app.delete(api_profile+'/activities/q=:id', profileController);


    /*****
     * [history ops]
     * get one profile + many history info; of joined, matched, leave
     * get one profile + one history info; of joined, matched, leave
     * get one profile activity
     * add one activity, redirect to activity controller (ac)
     * update one activity, redirect to ac
     * delete one activity, redirect to ac
     * disband one activity, redirect to ac
     * get connections, redirect to connection controller, (cc)
     * get reputation, redirect to reputation controller, (rc)
     * ****/

};