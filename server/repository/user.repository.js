// Require db connection
const db = require('../db/db.connection');
const genUUID4 = db.genUUID4;

// load models
const $ = db.sequelize.models;


// activate user account
async function activateAccount(userId) {

    try {
        console.log('activating user account ... ', userId);

        // update field of profile record
        return await User.update(
            {isActive: true},
            {where: {id: userId}});

    } catch (e) {
        return e;
    }

}

// delete by model + id
async function deleteBy(model, field, value) {
    let deleteQty = 0;

    try {
        console.log('deleting domain type ...  ', value);
        deleteQty = $[model].destroy({where: {[field]: value}});

        return deleteQty;
    } catch (e) {
        return e;
    }
}

// delete by model + id
async function deleteOne(model, id) {
    let deleteQty = 0;

    try {
        console.log('deleting domain type ...  ', id);
        deleteQty = $[model].destroy({where: {id: id}});

        return deleteQty;
    } catch (e) {
        return e;
    }
}

// find by model + id
async function findByPk(model, id) {

    try {
        console.log(`finding ${model} by pk => ${id}`);
        model = await $[model].findByPk(id);

        return model.dataValues;
    } catch (e) {
        return e;
    }

}

// find by model + id
async function findBy(model, field, id) {

    try {
        console.log(`finding ${model} by ${field} => ${id}`);
        model = await $[model].findOne({where: {[field]: id }});

        return model.dataValues;
    } catch (e) {
        return e;
    }

}

// save build type
async function save(model, data) {

    try {
        console.log(`saving ${model} with ${data.id}`);
        data = await data.save();

        return data.dataValues;
    } catch (e) {
        return e;
    }

}


// update model + data
async function update(model, data) {
    const Model = db.sequelize.models[model];

    try {
        console.log('updating model: ... ', model);
        return await Model.update(
            {...data},
            {where: {id: data.id}});

    } catch (e) {
        return e;
    }

}


// ENTITIES :: BUILD ; CREATE NEW
///////////////////////////////

// build model objects
const buildModel = function(model, data) {
    return $[model].build({...data});
};


const buildProfile = function (model = 'Profile', userId, domainId) {
    console.log('building profile using user id: ... ' + userId + ' and domain id: ... ' + domainId);
    return $[model].build({
        id: genUUID4(),
        userId: userId,
        domainTypeId: domainId,
        isActive: true
    });
    /// TODO change domain name after creating table for it
};



module.exports = {

    activateAccount,
    buildModel,
    buildProfile,
    deleteOne,
    deleteBy,
    findByPk,
    findBy,
    save,
    update,
    update,
};
