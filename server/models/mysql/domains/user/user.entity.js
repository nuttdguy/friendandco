const {DataTypes} = require('sequelize');
const uuid4 = require('uuid/v4');


module.exports = {

    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: uuid4()},
    username: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING }

};


// class Transaction extends Sequelize {
//
//     constructor(connectionString) {
//         super(connectionString);
//     }
//
//
//     dbSync(name, force=false) {
//         const u = this.models;
//         return u[name].sync({force: force});
//     }
//
//
//     dbAssociate() {
//
//         Object.keys(this.models).forEach(modelName => {
//             if ('associate' in this.models[modelName]) {
//                 this.models[modelName].associate(this.models);
//             }
//         })
//     }
//
//     add(model, values) {
//         this.models[model].create(values)
//             .then(r => {
//                 return r })
//             .catch(err => {
//                 return err
//             })
//     }
//
//     findOrCreate(model, keyValue, values) {
//         const key = keyValue[0], val = keyValue[1];
//         try {
//             const [v, k] = this.models[model].findOrCreate({
//                 where: { [key]: val },
//                 defaults: values});
//             return [v, k];
//         } catch (e) {
//             return e;
//         }
//     }
//
// }
//
//
// const t = new Transaction('mysql://friendandco:friendandcoAdmin@localhost:3306/friendandco');
// t.define('user', User);
// t.dbAssociate();
// t.dbSync('user');
// t.findOrCreate('user',
//     ['username', 'henry'],
//     {username: 'findOrCreate', firstName: 'findOrCreate', lastName: 'last test'});

