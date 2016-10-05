export const createUniquePairs = (array) => {
    const pairs = [];

    // Create a clone of the array first so we don't modify the original.
    array = array.slice();

    while (array.length > 1) {
        const a = array.shift();
        array.forEach(b => pairs.push([a, b]));
    }

    return pairs;
};

export default {
    createUniquePairs,
};
