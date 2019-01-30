// Trims and lowercase input data; returns copy of original data
module.exports = function shapeInput(data) {
    let copy = {...data};
    for (let k in copy) {
        if(typeof copy[k] === 'string') {
            copy[k] = copy[k].trim().toLowerCase();
        }
    }
    return copy;
};