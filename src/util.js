export const clone = array => {
    return array.slice();
};

export const createUniquePairs = array => {
    const pairs = [];
    array = clone(array);

    while (array.length > 1) {
        const a = array.shift();
        array.forEach(b => pairs.push([a, b]));
    }

    return pairs;
};
