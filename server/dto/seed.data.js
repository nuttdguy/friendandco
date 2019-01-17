const { generateUUID4, bcryptPassword } = require('../services/common/common.service');


async function genPassword(numToGen) {
    let arr = [];
    for (let i = 0; i < numToGen; i++) {
        arr.push(
            await bcryptPassword({password: 'password' + i})
        )
    }
    return arr;
}

async function genId(numToGen) {
    let arr = [];
    for (let i = 0; i < numToGen; i++) {
        arr.push(await generateUUID4())
    }
    return arr;

}


// user
const users = (ids, passwords) => [
    {id: ids[0], username: 'adam', firstName: 'adam', lastName: 'lask',
        email: 'adamlask@friendandco1.com', password: passwords[0] },

    {id:ids[1], username: 'john', firstName: 'john', lastName: 'share',
        email: 'johnshare@friendandco1.com', password:  passwords[1] },

    {id: ids[2], username: 'sara', firstName: 'sara', lastName: 'flakes',
        email: 'saraflakes@friendandco1.com', password:  passwords[2] },

    {id: ids[3], username: 'jamie', firstName: 'jamie', lastName: 'berry',
        email: 'jamieberry@friendandco1.com', password: passwords[3] },

    {id: ids[4], username: 'jessica', firstName: 'jessica', lastName: 'roberts',
        email: 'jessiaroberts@friendandco1.com',  password: passwords[1] },

];

const profileCategory = (ids, userIds) => [
    {id: ids[0], label: 'Education', desc: 'an education type', isActive: true, createdBy: userIds[0], fkProfileId: userIds[0] },
    {id: ids[1], label: 'hobby', desc: 'a hobby type', isActive: true, createdBy: userIds[1], fkProfileId: userIds[1] },
    {id: ids[2], label: 'interest', desc: 'a interest type', isActive: true, createdBy: userIds[2], fkProfileId: userIds[2] },
    {id: ids[3], label: 'Location', desc: 'a location type', isActive: true, createdBy: userIds[3], fkProfileId: userIds[3] },
    {id: ids[4], label: 'Photo', desc: 'a photo type', isActive: true, createdBy: userIds[4], fkProfileId: userIds[4] },
];

const profile = (ids, userIds) => [
    {id: ids[0], fkUserId: userIds[0] },
    {id: ids[1], fkUserId: userIds[1] },
    {id: ids[2], fkUserId: userIds[2] },
    {id: ids[3], fkUserId: userIds[3] },
];

const scene = (ids, userIds) => [
    {id: ids[0], label: 'outdoor', desc: 'something that takes place outdoors', isActive: true, createdBy: userIds[0] },
    {id: ids[1], label: 'indoor', desc: 'something that takes place indoors', isActive: true, createdBy: userIds[0] },
    {id: ids[3], label: 'online', desc: 'takes place virtually', isActive: true, createdBy: userIds[1] },
];

const kind = (ids, userIds) => [
    {id: ids[0], label: 'sporting', desc: 'active activity', isActive: true, createdBy: userIds[0] },
    {id: ids[1], label: 'swimming', desc: 'involves swimming', isActive: true, createdBy: userIds[2] },
];


const tag = (ids, userIds) =>  [
    {id: ids[0], label: 'sport', isActive: true, createdBy: userIds[0] },
    {id: ids[1], label: 'swim', isActive: true, createdBy: userIds[3] },
];

const activity = (ids, userIds) => [
        {id: ids[0], title: 'swim at lake Navato',
            city: 'Oakland', state: 'California', zip: '55111',
            address1: 'navato lake', address2: 'na',
            latitude: 111.9990, longitude: 120.9001,
            beginDate: Date.now(), endDate: Date.now(),
            beginTime: 930, endTime: 1700,
            isActive: true,
            createdBy: userIds[0] },

        {id: ids[1],  title: 'swim at lake Joseph',
            city: 'Oakland', state: 'California', zip: '55111',
            address1: 'navato lake', address2: 'na',
            latitude: 111.9990, longitude: 120.9001,
            beginDate: Date.now(), endDate: Date.now(),
            beginTime: 930, endTime: 1700,
            isActive: true,
            createdBy: userIds[1] },

        {id: ids[2],title: 'swim at lake Mnnetonka',
            city: 'Oakland', state: 'California', zip: '55111',
            address1: 'navato lake', address2: 'na',
            latitude: 111.9990, longitude: 120.9001,
            beginDate: Date.now(), endDate: Date.now(),
            beginTime: 930, endTime: 1700,
            isActive: true,
            createdBy: userIds[2] },

        {id: ids[3], title: 'swim at lake Winetka',
            city: 'Oakland', state: 'California', zip: '55111',
            address1: 'navato lake', address2: 'na',
            latitude: 111.9990, longitude: 120.9001,
            beginDate: Date.now(), endDate: Date.now(),
            beginTime: 930, endTime: 1700,
            isActive: true,
            createdBy: userIds[0] },

        {id: ids[4], title: 'swim at lake George',
            city: 'Oakland', state: 'California', zip: '55111',
            address1: 'navato lake', address2: 'na',
            latitude: 111.9990, longitude: 120.9001,
            beginDate: Date.now(), endDate: Date.now(),
            beginTime: 930, endTime: 1700,
            isActive: true,
            createdBy: userIds[3] }

];


module.exports = {
    users,
    genId,
    genPassword,
    profile,
    profileCategory,
    scene,
    kind,
    tag,
    activity,
};