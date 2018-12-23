
// const Sequelize = require('sequelize');
//
// // 1. create connection
// const sequelize = new Sequelize(
//     'friendandco',
//     'friendandco',
//     'friendandcoAdmin',
//     {
//        host: 'localhost',
//        dialect: 'mysql',
//        operatorsAliases: false,
//        pool: {
//           max: 5,
//           min: 0,
//           acquire: 30000,
//           idle: 10000
//        }
//     });

// 2. define model
// const secret = sequelize.define('secret', {
//    uuid: {type: Sequelize.UUID, allowNull: false, primaryKey: true},
//    token: {type: Sequelize.STRING, allowNull: false},
//    userId: {type: Sequelize.STRING, allowNull: false},
//    info: {
//       type: Sequelize.STRING,
//       get() {
//          const id = this.getDataValue('userId');
//          return this.getDataValue('info') + ' :: ' + id
//       }
//    }
//
// });

// 3. add model to sequelize
// secret.sequelize = sequelize;

// const s1 = new Secret({id: 2, name: 'test'});
// console.log(s1);

// 4. create model
// const s1 = sequelize.models['secret'].create({uuid: 3, token: 'ewe', userId: 'wew'});

// console.log(s1, '.. secret here');


// const model = Secret.create({uuid: 'uoiuo', token: '12132', userId: '830982j'});
// console.log(model.get('info'));

// module.exports = Secret;