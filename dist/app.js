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
function mapObject(obj) {
    const stack = [['', obj]];
    const result = {};
    while (stack.length) {
        const [prefix, current] = stack.pop();
        console.log('prefix', prefix);
        console.log('current', current);
        if (typeof current === 'object' && !Array.isArray(current) && current !== null) {
            for (const key in current) {
                stack.push([`${prefix}${key}/`, current[key]]);
            }
        }
        else {
            result[prefix.slice(0, -1)] = current;
        }
    }
    return result;
}
function combos(num) {
    const result = [];
    const stack = [[[], 1, num]];
    while (stack.length > 0) {
        const [currentCombo, start, remaining] = stack.pop();
        if (remaining === 0) {
            result.push(currentCombo);
        }
        else {
            for (let i = start; i <= remaining; i++) {
                stack.push([currentCombo.concat(i), i, remaining - i]);
            }
        }
    }
    return result;
}
function add(num) {
    let sum = num;
    function innerAdd(num1) {
        sum += num1;
        return innerAdd;
    }
    innerAdd.valueOf = function () {
        return sum;
    };
    return innerAdd;
}
//# sourceMappingURL=app.js.map