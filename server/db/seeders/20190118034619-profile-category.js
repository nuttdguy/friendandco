'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ProfileCategories', [
      {
        id: '1004372a-51cc-43e7-9245-0d5e801ad1e6',
        label: 'Education',
        desc: 'an education type',
        isActive: true,
        createdBy: '3112dcdd-70ee-45f7-9e33-dc1150868c76',
        fkProfileId: '100348c7-3e5a-4fe6-ae14-91b7ea6d3e8f',
        createdAt: '2018-01-18 08:14:44',
        updatedAt: '2018-01-18 08:14:44',
      },
      {
        id: '1014372a-51cc-43e7-9245-0d5e801ad1e6',
        label: 'hobby',
        desc: 'a hobby type',
        isActive: true,
        createdBy: '3306e983-7e3c-4f14-9f88-836e3b79da9b',
        fkProfileId: '102348c7-3e5a-4fe6-ae14-91b7ea6d3e8f',
        createdAt: '2018-01-18 08:14:44',
        updatedAt: '2018-01-18 08:14:44',
      },
      {
        id: '1034372a-51cc-43e7-9245-0d5e801ad1e6',
        label: 'interest',
        desc: 'a interest type',
        isActive: true,
        createdBy: '205b61fc-2723-4be0-8ad8-957b3c414c89',
        fkProfileId: '103348c7-3e5a-4fe6-ae14-91b7ea6d3e8f',
        createdAt: '2018-01-18 08:14:44',
        updatedAt: '2018-01-18 08:14:44',
      },
      {
        id: '1044372a-51cc-43e7-9245-0d5e801ad1e6',
        label: 'Location',
        desc: 'a location type',
        isActive: true,
        createdBy: '215b61fc-2723-4be0-8ad8-957b3c414c89',
        fkProfileId:  '104348c7-3e5a-4fe6-ae14-91b7ea6d3e8f',
        createdAt: '2018-01-18 08:14:44',
        updatedAt: '2018-01-18 08:14:44',
      },
      {
        id: '1054372a-51cc-43e7-9245-0d5e801ad1e6',
        label: 'Photo',
        desc: 'a photo type',
        isActive: true,
        createdBy: '225b61fc-2723-4be0-8ad8-957b3c414c89',
        fkProfileId: '105348c7-3e5a-4fe6-ae14-91b7ea6d3e8f',
        createdAt: '2018-01-18 08:14:44',
        updatedAt: '2018-01-18 08:14:44',
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ProfileCategories', null, {});
  }
};
