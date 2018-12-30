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

const activity = (ids, scene, kind, userIds) => [
        {id: ids[0], scene: scene[0], kind: kind[0], title: 'swim at lake Navato',
        beginDate: Date.now(), endDate: Date.now(), beginTime: 930, endTime: 1700, minActor: 4,
        maxActor: 12, isActive: true, location: 'lake Navato',  createdBy: userIds[0] },

        {id: ids[1], scene: scene[1], kind: kind[1], title: 'swim at lake Joseph',
            beginDate: Date.now(), endDate: Date.now(), beginTime: 930, endTime: 1700, minActor: 4,
            maxActor: 12, isActive: true, location: 'lake Joseph',  createdBy: userIds[1] },

        {id: ids[2], scene: scene[0], kind: kind[1], title: 'swim at lake Mnnetonka',
            beginDate: Date.now(), endDate: Date.now(), beginTime: 930, endTime: 1700, minActor: 4,
            maxActor: 12, isActive: true, location: 'lake Mnnetonka',  createdBy: userIds[2] },

        {id: ids[3], scene: scene[1], kind: kind[1], title: 'swim at lake Winetka',
            beginDate: Date.now(), endDate: Date.now(), beginTime: 930, endTime: 1700, minActor: 4,
            maxActor: 12, isActive: true, location: 'lake Winetka',  createdBy: userIds[0] },

        {id: ids[4], scene: scene[2], kind: kind[0], title: 'swim at lake George',
            beginDate: Date.now(), endDate: Date.now(), beginTime: 930, endTime: 1700, minActor: 4,
            maxActor: 12, isActive: true, location: 'lake George',  createdBy: userIds[3] }

];


module.exports = {
    users,
    genId,
    genPassword,
    scene,
    kind,
    tag,
    activity,
};