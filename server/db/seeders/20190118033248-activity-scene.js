'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('ActivityScenes', [
            {
                id: "215b2619-16a9-4b6b-868a-858743d546ab",
                label: 'outdoor',
                desc: 'something that takes place outdoors',
                isActive: true,
                createdBy: '3112dcdd-70ee-45f7-9e33-dc1150868c76',
                createdAt: '2018-01-18 08:14:44',
                updatedAt: '2018-01-18 08:14:44'
            },
            {
                id: "215b2619-16a9-4b6b-868a-858743d546dd", label: 'indoor', desc: 'something that takes place indoors',
                isActive: true, createdBy: '3112dcdd-70ee-45f7-9e33-dc1150868c76',
                createdAt: '2018-01-18 08:14:44',
                updatedAt: '2018-01-18 08:14:44'
            },
            {
                id: "215b2619-16a9-4b6b-868a-858743d546cc", label: 'online', desc: 'takes place virtually',
                isActive: true, createdBy: '3112dcdd-70ee-45f7-9e33-dc1150868c76',
                createdAt: '2018-01-18 08:14:44',
                updatedAt: '2018-01-18 08:14:44'
            },

        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('ActivityScenes', null, {});
    }
};
