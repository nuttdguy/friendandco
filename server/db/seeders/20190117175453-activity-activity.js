'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Activities', [
            {
                id: '1ae798d2-80c6-4634-b3c4-f1d48dc121bf',
                title: 'Walk in a park',
                city: 'Oakland',
                state: 'California',
                zip: 94608,
                address1: 'Erie Park',
                address2: '',
                latitude: 0,
                longitude: 0,
                url: '',
                isActive: true,
                createdAt: '2018-01-18 08:14:44',
                updatedAt: '2018-01-18 08:14:44',
                createdBy: '3112dcdd-70ee-45f7-9e33-dc1150868c76'
            },
            {
                id: '2eac3efc-3894-4701-ae29-43c7530e9b1d',
                title: 'Walk in a forest',
                city: 'Oakland',
                state: 'California',
                zip: 94608,
                address1: 'Forest Park',
                address2: '',
                latitude: 0,
                longitude: 0,
                url: '',
                isActive: true,
                createdAt: '2018-01-18 08:14:44',
                updatedAt: '2018-01-18 08:14:44',
                createdBy: '3112dcdd-70ee-45f7-9e33-dc1150868c76'
            },
            {
                id: 'cea3d59f-37a0-4ae9-8c87-deed89e94361',
                title: 'Walk in a Ocean',
                city: 'Oakland',
                state: 'California',
                zip: 94608,
                address1: 'Ocean sea',
                address2: '',
                latitude: 0,
                longitude: 0,
                url: '',
                isActive: true,
                createdAt: '2018-01-18 08:14:44',
                updatedAt: '2018-01-18 08:14:44',
                createdBy: '3112dcdd-70ee-45f7-9e33-dc1150868c76'
            },
            {
                id: '1003d59f-37a0-4ae9-8c87-deed89e94361', title: 'swim at lake Navato',
                city: 'Oakland', state: 'California', zip: '55111',
                address1: 'navato lake', address2: 'na',
                latitude: 111.9990,
                longitude: 120.9001,
                beginDate: '2018-01-18 08:14:44',
                endDate: '2018-01-18 08:14:44',
                beginTime: 930, endTime: 1700,
                isActive: true,
                createdAt: '2018-01-18 08:14:44',
                updatedAt: '2018-01-18 08:14:44',
                createdBy: '225b61fc-2723-4be0-8ad8-957b3c414c89'
            },

            {
                id: '2003d59f-37a0-4ae9-8c87-deed89e94361', title: 'swim at lake Joseph',
                city: 'Oakland', state: 'California', zip: '55111',
                address1: 'navato lake', address2: 'na',
                latitude: 111.9990,
                longitude: 120.9001,
                beginDate: '2018-01-18 08:14:44',
                endDate: '2018-01-18 08:14:44',
                beginTime: 930, endTime: 1700,
                isActive: true,
                createdAt: '2018-01-18 08:14:44',
                updatedAt: '2018-01-18 08:14:44',
                createdBy: '215b61fc-2723-4be0-8ad8-957b3c414c89'
            },

            {
                id: '3003d59f-37a0-4ae9-8c87-deed89e94361', title: 'swim at lake Mnnetonka',
                city: 'Oakland', state: 'California', zip: '55111',
                address1: 'navato lake', address2: 'na',
                latitude: 111.9990,
                longitude: 120.9001,
                beginDate: '2018-01-18 08:14:44',
                endDate: '2018-01-18 08:14:44',
                beginTime: 930, endTime: 1700,
                isActive: true,
                createdAt: '2018-01-18 08:14:44',
                updatedAt: '2018-01-18 08:14:44',
                createdBy: '3306e983-7e3c-4f14-9f88-836e3b79da9b'
            },

            {
                id: '4003d59f-37a0-4ae9-8c87-deed89e94361', title: 'swim at lake Winetka',
                city: 'Oakland', state: 'California', zip: '55111',
                address1: 'navato lake', address2: 'na',
                latitude: 111.9990,
                longitude: 120.9001,
                beginDate: '2018-01-18 08:14:44',
                endDate: '2018-01-18 08:14:44',
                beginTime: 930, endTime: 1700,
                isActive: true,
                createdAt: '2018-01-18 08:14:44',
                updatedAt: '2018-01-18 08:14:44',
                createdBy: '3306e983-7e3c-4f14-9f88-836e3b79da9b'
            },

            {
                id: '5003d59f-37a0-4ae9-8c87-deed89e94361', title: 'swim at lake George',
                city: 'Oakland', state: 'California', zip: '55111',
                address1: 'navato lake', address2: 'na',
                latitude: 111.9990,
                longitude: 120.9001,
                beginDate: '2018-01-18 08:14:44',
                endDate: '2018-01-18 08:14:44',
                beginTime: 930, endTime: 1700,
                isActive: true,
                createdAt: '2018-01-18 08:14:44',
                updatedAt: '2018-01-18 08:14:44',
                createdBy: '3112dcdd-70ee-45f7-9e33-dc1150868c76'
            }
        ])
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Activities', null, {});
    }
};
