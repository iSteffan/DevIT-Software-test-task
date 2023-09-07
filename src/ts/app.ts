// #### **=== GIT ===**

// **Рабочее окружение**

// Вы закончили работу над задачей для клиента и у вас есть рабочий код, который был создан без использования git.
// Клиент создал пустой репозиторий[git@example.com](mailto: git@example.com): example/test.git и расшалил для вас доступ.

// **Задание**

// Опишите ваши дальнейшие действия что бы ваш код появился в ветке master в репозитории [git@example.com](mailto:git@example.com):example/test.git

// Відповідь: клоную репозиторій собі локально на ноут, заходжу в гілку main - клоную сюди весь свій код - створюю коміт,
// робпю пуш і все - мій код на гітхабі.

// 1\. Напишите функцию deepEqual для проверки двух обьектов на идентичность.

function deepEqual(objA: object, objB: object): boolean {
  // приводжу об'єкти до рядків і порівнюю їх
  const strA = JSON.stringify(objA);
  const strB = JSON.stringify(objB);
  return strA === strB;
}

// console.log(deepEqual({ name: 'test' }, { name: 'test' })); // output true
// console.log(deepEqual({ name: 'test' }, { name: 'test1' })); // output false
// console.log(deepEqual({ name: 'test', data: { value: 1 } }, { name: 'test', data: { value: 2 } })); // output false
// console.log(deepEqual({ name: 'test' }, { name: 'test', age: 10 })); // false

// 2\. Напишите функцию генератор chunkArray, которая возвращает итератор возвращающий части массива указанной длинны.

function* chunkArray(arr: any[], chunkSize: number) {
  //  змінна, яка служитиме для відстеження поточної позиції в масиві
  let index = 0;

  while (index < arr.length) {
    // операція yield дозволяє повернути частину масиву arr в поточній ітерації циклу.
    // виділення частини масиву від поточного index до index + chunkSize
    yield arr.slice(index, (index += chunkSize));
  }
}

const iterator: Iterator<any[], any, undefined> = chunkArray([1, 2, 3, 4, 5, 6, 7, 8], 3);

//console.log(iterator.next()); // { value: [1, 2, 3], done: false }
//console.log(iterator.next()); // { value: [4, 5, 6], done: false }
//console.log(iterator.next()); // { value: [7, 8], done: false }
//console.log(iterator.next()); // { value: undefined, done: true }

// 3\. Напишите функцию обертку, которая на вход принимает массив функций и их параметров, а возвращает массив результатов их выполнения.
// Количество аргументов исполняемой функции ** не ограничено ** !

type FunctionWithParams = (...args: any[]) => any;

function bulkRun(functions: FunctionWithParams[], params: any[]): any[] {
  const results: any[] = [];

  for (let i = 0; i < functions.length; i++) {
    const func = functions[i];
    const paramArray = params[i];
    const result = func(...paramArray);
    results.push(result);
  }

  return results;
}

// const f1 = (cb) => {cb(1)}
// const f2 = (a, cb) => {cb(a)}
// const f3 = (a, b, cb) => {setTimeout(() => cb([a, b]), 1000)}

// bulkRun(
//   [
//     [f1, []],
//     [f2, [2]]
//     [f3, [3, 4]]
//   ]
// ).then(console.log)
//  // Output: [1, 2, [3, 4]]

// 4\. Напишите метод arrayToObject, который превращает массив в объект (использовать рекурсию). Пример:

function arrayToObject(arr: any[]): object {
  const result: any = {};

  // Проходимось по кожному елементі вхідного масиву,
  // якщо значення це масив ? визиваємо arrayToObject : додаємо в об'єкт.
  for (const [key, value] of arr) {
    if (Array.isArray(value)) {
      result[key] = arrayToObject(value);
    } else {
      result[key] = value;
    }
  }

  return result;
}

// var arr = [['name', 'developer'], ['age', 5], ['skills', [['html',4], ['css', 5], ['js',5]]]];

// arrayToObject(arr)
// // Outputs: {
// 	name: 'developer',
// 	age: 5,
// 	skills: {
// 		html: 4,
// 		css: 5,
// 		js: 5
// 	}

// 5\. Написать обратный метод (см. задачу 4) objectToArray, который из объекта создаст массив. Пример:

// objectToArray({
// 	name: 'developer',
// 	age: 5,
// 	skills: {
// 		html: 4,
// 		css: 5,
// 		js: 5
// 	}
// })

// Outputs: [['name', 'developer'], ['age', 5], ['skills', [['html', 4], ['css', 5], ['js', 5]]]

// 6\. Есть функция `primitiveMultiply`, которая умножает числа, но случайным образом может выбрасывать исключения типа: `NotificationException`, `ErrorException`. Задача написать функцию обертку которая будет повторять вычисление при исключении `NotificationException`, но прекращать работу при исключениях `ErrorException`

// function NotificationException() {}
// function ErrorException() {}
// function primitiveMultiply(a, b) {
//   const rand = Math.random();
//   if (rand < 0.5) {
//     return a * b;
//   } else if(rand > 0.85) {
//     throw new ErrorException()
//   } else {
//     throw new NotificationException()
//   }
// }

// function reliableMultiply(a, b) {
//   // Ваш код
// }

// console.log(reliableMultiply(8, 8));

// 7\.  Напишите функцию, которая берет объект любой вложенности и преобразует ее в единую плоскую карту с разными уровнями, разделенными косой чертой ( `'/'`).

// const obj = {
//   a: {
//     b: {
//       c: 12,
//       d: 'Hello World'
//     },
//     e: [1,2,3]
//   }
// };

// mapObject(demoData);
// // Outputs: {
//   'a/b/c': 12,
//   'a/b/d': 'Hello World',
//   'a/e': [1,2,3]
// }

// 8\. Напишите функцию `combos`, которая принимает положительное целое число `num` и возвращает массив массивов положительных целых чисел, где сумма каждого массива равна  `num`.  Массивы не должны повторяться.

// combos(3);
// // Output:
// [
//   [ 3 ],
//   [ 1, 1, 1 ],
//   [ 1, 2 ]
// ]

// combos(10);
// // Output:
// [
//   [ 10 ],
//   [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
//   [ 1, 1, 1, 1, 1, 1, 1, 1, 2 ],
//   [ 1, 1, 1, 1, 1, 1, 1, 3 ],
//   [ 1, 1, 1, 1, 1, 1, 4 ],
//   [ 1, 1, 1, 1, 1, 5 ],
//   [ 1, 1, 1, 1, 6 ],
//   [ 1, 1, 1, 7 ],
//   [ 1, 1, 8 ],
//   [ 1, 9 ],
//   [ 1, 1, 1, 1, 1, 1, 2, 2 ],
//   [ 1, 1, 1, 1, 1, 2, 3 ],
//   [ 1, 1, 1, 1, 2, 4 ],
//   [ 1, 1, 1, 1, 2, 2, 2 ],
//   [ 1, 1, 1, 1, 3, 3 ],
//   [ 1, 1, 1, 2, 5 ],
//   [ 1, 1, 1, 2, 2, 3 ],
//   [ 1, 1, 1, 3, 4 ],
//   [ 1, 1, 2, 6 ],
//   [ 1, 1, 2, 2, 4 ],
//   [ 1, 1, 2, 2, 2, 2 ],
//   [ 1, 1, 2, 3, 3 ],
//   [ 1, 1, 3, 5 ],
//   [ 1, 1, 4, 4 ],
//   [ 1, 2, 7 ],
//   [ 1, 2, 2, 5 ],
//   [ 1, 2, 2, 2, 3 ],
//   [ 1, 2, 3, 4 ],
//   [ 1, 3, 6 ],
//   [ 1, 3, 3, 3 ],
//   [ 1, 4, 5 ],
//   [ 2, 8 ],
//   [ 2, 2, 6 ],
//   [ 2, 2, 2, 4 ],
//   [ 2, 2, 2, 2, 2 ],
//   [ 2, 2, 3, 3 ],
//   [ 2, 3, 5 ],
//   [ 2, 4, 4 ],
//   [ 3, 7 ],
//   [ 3, 3, 4 ],
//   [ 4, 6 ],
//   [ 5, 5 ]
// ]

// 9\.  Напишите функцию `add`, которая бы работала следующим образом `add(1)(2)(7)...(n)`. Количество последовательных визовов неограничено.

// Number(add(1)(2)); // == 3
// Number(add(1)(2)(5)); // == 8
// Number(add(1)(2)(-3)(4)); //  == 4
// Number(add(1)(2)(3)(4)(-5)); // == 5
