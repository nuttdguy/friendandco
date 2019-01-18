'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Profiles', [
            {
                id: '100348c7-3e5a-4fe6-ae14-91b7ea6d3e8f',
                fkUserId: '3112dcdd-70ee-45f7-9e33-dc1150868c76',
                createdAt: '2018-01-18 08:14:44',
                updatedAt: '2018-01-18 08:14:44',
            },
            {
                id: '102348c7-3e5a-4fe6-ae14-91b7ea6d3e8f',
                fkUserId: '3306e983-7e3c-4f14-9f88-836e3b79da9b',
                createdAt: '2018-01-18 08:14:44',
                updatedAt: '2018-01-18 08:14:44',
            },
            {
                id: '103348c7-3e5a-4fe6-ae14-91b7ea6d3e8f',
                fkUserId: '205b61fc-2723-4be0-8ad8-957b3c414c89',
                createdAt: '2018-01-18 08:14:44',
                updatedAt: '2018-01-18 08:14:44',
            },
            {
                id: '104348c7-3e5a-4fe6-ae14-91b7ea6d3e8f',
                fkUserId: '215b61fc-2723-4be0-8ad8-957b3c414c89',
                createdAt: '2018-01-18 08:14:44',
                updatedAt: '2018-01-18 08:14:44',
            },
            {
                id: '105348c7-3e5a-4fe6-ae14-91b7ea6d3e8f',
                fkUserId: '225b61fc-2723-4be0-8ad8-957b3c414c89',
                createdAt: '2018-01-18 08:14:44',
                updatedAt: '2018-01-18 08:14:44',
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Profiles', null, {});
    }
};
