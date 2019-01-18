'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: '3112dcdd-70ee-45f7-9e33-dc1150868c76', username: 'adam', firstName: 'adam', lastName: 'lask',
        email: 'adamlask@friendandco1.com', password: '8be3c943b1609fffbfc51aad666d0a04adf83c9d',
        createdAt: '2018-01-18 08:14:44',
        updatedAt: '2018-01-18 08:14:44',
      },

      {
        id: '3306e983-7e3c-4f14-9f88-836e3b79da9b', username: 'john', firstName: 'john', lastName: 'share',
        email: 'johnshare@friendandco1.com', password: '8be3c943b1609fffbfc51aad666d0a04adf83c9d',
        createdAt: '2018-01-18 08:14:44',
        updatedAt: '2018-01-18 08:14:44',
      },

      {
        id: '205b61fc-2723-4be0-8ad8-957b3c414c89', username: 'sara', firstName: 'sara', lastName: 'flakes',
        email: 'saraflakes@friendandco1.com', password: '8be3c943b1609fffbfc51aad666d0a04adf83c9d',
        createdAt: '2018-01-18 08:14:44',
        updatedAt: '2018-01-18 08:14:44',
      },

      {
        id: '215b61fc-2723-4be0-8ad8-957b3c414c89', username: 'jamie', firstName: 'jamie', lastName: 'berry',
        email: 'jamieberry@friendandco1.com', password: '8be3c943b1609fffbfc51aad666d0a04adf83c9d',
        createdAt: '2018-01-18 08:14:44',
        updatedAt: '2018-01-18 08:14:44',
      },

      {
        id: '225b61fc-2723-4be0-8ad8-957b3c414c89', username: 'jessica', firstName: 'jessica', lastName: 'roberts',
        email: 'jessiaroberts@friendandco1.com', password: '8be3c943b1609fffbfc51aad666d0a04adf83c9d',
        createdAt: '2018-01-18 08:14:44',
        updatedAt: '2018-01-18 08:14:44',
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
