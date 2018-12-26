// Trims and lowercase input data; returns copy of original data
module.exports = function shapeInput(data) {
    let copy = {...data};
    for (let k in copy) {
        copy[k] = copy[k].trim().toLowerCase();
    }
    return copy;
};