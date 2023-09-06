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
//# sourceMappingURL=app.js.map