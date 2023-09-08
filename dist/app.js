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
function objectToArray(obj) {
    const result = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (typeof value === 'object' && value !== null) {
                result.push([key, objectToArray(value)]);
            }
            else {
                result.push([key, value]);
            }
        }
    }
    return result;
}
class NotificationException extends Error {
}
class ErrorException extends Error {
}
function primitiveMultiply(a, b) {
    const rand = Math.random();
    if (rand < 0.5) {
        return a * b;
    }
    else if (rand > 0.85) {
        throw new ErrorException();
    }
    else {
        throw new NotificationException();
    }
}
function reliableMultiply(a, b) {
    while (true) {
        try {
            return primitiveMultiply(a, b);
        }
        catch (error) {
            if (error instanceof ErrorException) {
                throw error;
            }
            else if (error instanceof NotificationException) {
                continue;
            }
            else {
                throw error;
            }
        }
    }
}
//# sourceMappingURL=app.js.map