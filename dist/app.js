function deepEqual(objA, objB) {
    const strA = JSON.stringify(objA);
    const strB = JSON.stringify(objB);
    return strA === strB;
}
function* chunkArray(arr, chunkSize) {
    let index = 0;
    while (index < arr.length) {
        yield arr.slice(index, (index += chunkSize));
    }
}
const iterator = chunkArray([1, 2, 3, 4, 5, 6, 7, 8], 3);
function bulkRun(functions, params) {
    const results = [];
    for (let i = 0; i < functions.length; i++) {
        const func = functions[i];
        const paramArray = params[i];
        const result = func(...paramArray);
        results.push(result);
    }
    return results;
}
function arrayToObject(arr) {
    const result = {};
    for (const [key, value] of arr) {
        if (Array.isArray(value)) {
            result[key] = arrayToObject(value);
        }
        else {
            result[key] = value;
        }
    }
    return result;
}
//# sourceMappingURL=app.js.map