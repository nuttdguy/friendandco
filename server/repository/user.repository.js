// Require db connection
const db = require('../db/db.connection');
const genUUID4 = db.genUUID4;

// load models
const $ = db.sequelize.models;

// delete by model + id
async function deleteBy(model, field, value) {
    let deleteQty = 0;

    try {
        console.log(`deleteBy ${model} by ${field} = ${value} `);
        deleteQty = await $[model].destroy({where: {[field]: value}});

        return deleteQty;
    } catch (e) {
        return e.errors;
    }
}

// delete by model + id
async function deleteByPk(model, id) {
    let deleteQty = 0;

    try {
        console.log(`deleteByPk ${model} by id = ${id} `);
        deleteQty = await $[model].destroy({where: {id: id}});

        return deleteQty;
    } catch (e) {
        return e.errors;
    }
}

// find by model + id
async function findByPk(model, id) {

    try {
        console.log(`finding ${model} by pk => ${id}`);
        model = await $[model].findByPk(id);

        return model !== null ? model.dataValues : null;
    } catch (e) {
        return e.errors;
    }

}

// find by model + id
async function findBy(model, field, value) {

    try {
        // console.log(`finding ${model} by ${field} => ${value}`);
        model = await $[model].findOne({where: {[field]: value }});

        return model !== null ? model.dataValues : null;
    } catch (e) {
        return e.errors;
    }

}

// save build type
async function save(model, data) {
    try {
        console.log(`saving ${model} with ${data.id}`);
        data = await data.save();

        return data.dataValues;
    } catch (e) {
        return e.errors;
    }

}

// update model + data
async function update(model, data) {

    try {
        // console.log('updating model: ... ', model);
        return await $[model].update(
            {...data},
            {where: {id: data.id}});

    } catch (e) {
        return e.errors;
    }

}

// build model objects
function buildModel(model, data) {
    console.log(`building type: ${model}`);
    // return $[model].build({...data});
    return $[model].build({...data, id: data.id});
}

// build model with id of another object
function buildRelationType(model, idFieldName, id, data = {}) {
    return $[model].build({...data, [idFieldName]: id});
}

// build join model
function buildJoinType(model, field1, value1, field2 = null, value2 = null,) {
    console.log('building profile using user id: ... ' + value1 + ' and domain id: ... ' + value2);
    // if (field2 || value2) {}

    return $[model].build({
        id: genUUID4(),
        [field1]: value1,
        [field2]: value2,
        isActive: true,
    });
}


module.exports = {

    buildRelationType,
    buildModel,
    buildJoinType,

    deleteBy,
    deleteByPk,

    findBy,
    findByPk,
    save,
    update,
};
