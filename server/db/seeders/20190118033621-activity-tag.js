'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('ActivityTags', [
            {
                id: '255b32fe-2b69-4715-8627-40918ac36da2', label: 'sport', isActive: true,
                createdAt: '2018-01-18 08:14:44',
                updatedAt: '2018-01-18 08:14:44',
                createdBy: '3112dcdd-70ee-45f7-9e33-dc1150868c76'
            },
            {
                id: '255b32fe-2b69-4715-8627-40918ac36d21', label: 'swim', isActive: true,
                createdAt: '2018-01-18 08:14:44',
                updatedAt: '2018-01-18 08:14:44',
                createdBy: '3112dcdd-70ee-45f7-9e33-dc1150868c76'
            },

        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('ActivityTags', null, {});
    }
};
