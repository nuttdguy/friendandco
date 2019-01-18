'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('ActivityKinds', [
            {
                id: '033faa19-1ec7-4024-9729-f45e18b72699', label: 'sporting', desc: 'active activity',
                isActive: true, createdBy: '3112dcdd-70ee-45f7-9e33-dc1150868c76',
                createdAt: '2018-01-18 08:14:44',
                updatedAt: '2018-01-18 08:14:44'
            },

            {
                id: '2aa6b6e4-f553-496b-bebd-4e49a3de83c6', label: 'swimming', desc: 'involves swimming',
                isActive: true, createdBy: '3112dcdd-70ee-45f7-9e33-dc1150868c76',
                createdAt: '2018-01-18 08:14:44',
                updatedAt: '2018-01-18 08:14:44'
            },

        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('ActivityKinds', null, {});
    }
};
