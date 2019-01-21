// Require db connection
const db = require('../db/db.connection');
const genUUID4 = db.genUUID4;

// load models
const $ = db.sequelize.models;

// delete by model + id
async function deleteBy(model, field, value) {
    let deleteQty = 0;

    try {
        console.log(`deleting  ${model} by ${field} = ${value} `);
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
        console.log(`deleting  ${model} by id = ${id} `);
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
async function findBy(model, field, value) {

    try {
        console.log(`finding ${model} by ${field} => ${value}`);
        model = await $[model].findOne({where: {[field]: value }});

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

    try {
        console.log('updating model: ... ', model);
        return await $[model].update(
            {...data},
            {where: {id: data.id}});

    } catch (e) {
        return e;
    }

}

// build model objects
function buildModel(model, data) {
    return $[model].build({...data});
}

// build join model
function buildJoinModel(model, value1, value2, field1, field2) {
    console.log('building profile using user id: ... ' + value1 + ' and domain id: ... ' + value2);
    return $[model].build({
        id: genUUID4(),
        [field1]: value1,
        [field2]: value2,
        isActive: true
    });
    /// TODO change domain name after creating table for it
}


module.exports = {

    buildModel,
    buildJoinModel,

    deleteBy,
    deleteOne,

    findBy,
    findByPk,
    save,
    update,
};
