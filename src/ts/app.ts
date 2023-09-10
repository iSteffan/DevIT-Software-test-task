// #### **=== GIT ===**

// **Рабочее окружение**

// Вы закончили работу над задачей для клиента и у вас есть рабочий код, который был создан без использования git.
// Клиент создал пустой репозиторий[git@example.com](mailto: git@example.com): example/test.git и расшалил для вас доступ.

// **Задание**

// Опишите ваши дальнейшие действия что бы ваш код появился в ветке master в репозитории [git@example.com](mailto:git@example.com):example/test.git

// Відповідь: клоную репозиторій собі локально на ноут, заходжу в гілку main - копіюю сюди весь свій код - створюю коміт,
// робпю пуш і все - мій код на гітхабі в гілці main.

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

const iterator: Iterator<any[], any> = chunkArray([1, 2, 3, 4, 5, 6, 7, 8], 3);

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

function objectToArray(obj: any): any[] {
  const result: any[] = [];

  // проходимось циклом по об'єкту
  for (const key in obj) {
    //перевіряємо чи належить об'єкту властивість key (виключаємо належність до прототипів)
    if (obj.hasOwnProperty(key)) {
      // записуємо властивість в змінну
      const value = obj[key];
      // перевіряємо чи це об'єкт - викликаємо рекурсію, якщо ні то відразу пушимо в result
      // з прикладу: перше value - 'developer' - відразу пушимо в result
      // аналогічно з age: 5,
      // далі потрапляємо під перевірку об'єкта value = {html: 4, css: 5, js: 5} - потрапляємо в рекурсію
      // на кожній ітерації в key та value по черзі потрапляють всі ключі та значення {html: 4, css: 5, js: 5}
      // утворюється тимчасовий масив всередині рекурсії [['html', 4], ['css', 5], ['js', 5]]
      // після закінчення рекурсії цей тимчасовий масив додається як [key, value] в основний result
      if (typeof value === 'object' && value !== null) {
        result.push([key, objectToArray(value)]);
      } else {
        result.push([key, value]);
      }
    }
  }

  return result;
}

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

class NotificationException extends Error {}
class ErrorException extends Error {}

function primitiveMultiply(a: number, b: number): number {
  const rand = Math.random();
  if (rand < 0.5) {
    return a * b;
  } else if (rand > 0.85) {
    throw new ErrorException();
  } else {
    throw new NotificationException();
  }
}

function reliableMultiply(a: number, b: number): number {
  // виконується завжди оскільки while true
  while (true) {
    // використовуємо блок try....catch для відловлення помилок
    try {
      return primitiveMultiply(a, b);
    } catch (error) {
      // якщо помилка належить до ErrorException - викидуємо помилку і перериваємо код
      if (error instanceof ErrorException) {
        throw error;
      }
      // якщо помилка належить до NotificationException - продовжуємо виконання коду
      else if (error instanceof NotificationException) {
        continue;
      } else {
        // якщо виникла інша помилка - показуємо її
        throw error;
      }
    }
  }
}

// console.log(reliableMultiply(8, 8));

// 7\.  Напишите функцию, которая берет объект любой вложенности и преобразует ее в единую плоскую карту с разными уровнями, разделенными косой чертой ( `'/'`).

function mapObject(obj: Record<string, any>): Record<string, any> {
  //стек для ітерації по об'єкту
  const stack: Array<[string, any]> = [['', obj]];
  // результуючий об'єкт
  const result: Record<string, any> = {};

  // цикл працює до поки stack не стане пустим
  while (stack.length) {
    // витягуєм елемент з вершини стека, в префікс попадає на даній ітерації - '', в current об'єкт на даній ітерації циклу
    const [prefix, current] = stack.pop() as [string, any];
    console.log('prefix', prefix);
    console.log('current', current);
    // перевіряємо current
    if (typeof current === 'object' && !Array.isArray(current) && current !== null) {
      for (const key in current) {
        // додаємо пару ключ-значення в стек для наступної обробки
        stack.push([`${prefix}${key}/`, current[key]]);
      }
    } else {
      // якщо значення не є об'єктом, додаєм його в результат
      result[prefix.slice(0, -1)] = current;
    }
  }

  return result;
}

// const obj = {
//   a: {
//     b: {
//       c: 12,
//       d: 'Hello World',
//     },
//     e: [1, 2, 3],
//   },
// };

// console.log(mapObject(obj));
// // Outputs: {
//   'a/b/c': 12,
//   'a/b/d': 'Hello World',
//   'a/e': [1,2,3]
// }

// 8\. Напишите функцию `combos`, которая принимает положительное целое число `num` и возвращает массив массивов положительных целых чисел, где сумма каждого массива равна  `num`.  Массивы не должны повторяться.

function combos(num: number): number[][] {
  // результуючий масив
  const result: number[][] = [];
  // стек для можливих комбінацій де перший елемент - це поточна комбінація чисел,
  // другий - початкове число, яким можна розпочати додавати числа до комбінації, і третій - залишок, який треба отримати
  const stack: [number[], number, number][] = [[[], 1, num]];

  // цикл триває, доки стек не стане порожнім. Цей цикл допоможе нам обходити всі можливі комбінації
  while (stack.length > 0) {
    // витягуємо зі стека поточну комбінацію currentCombo, початкове число start, і залишок remaining
    const [currentCombo, start, remaining] = stack.pop()!;

    // Ми перевіряємо, чи залишок remaining дорівнює 0. Якщо так, то це означає, що ми знайшли комбінацію чисел,
    // сума яких дорівнює вхідному числу num, і додаємо цю комбінацію до результату
    if (remaining === 0) {
      result.push(currentCombo);
    }
    // інакше генеруємо нові комбінації, додаючи числа від start до remaining до поточної комбінації і додаємо їх до стека для подальшого обходу
    else {
      for (let i = start; i <= remaining; i++) {
        stack.push([currentCombo.concat(i), i, remaining - i]);
      }
    }
  }

  return result;
}

// console.log(combos(3));
// // Output:
// [
//   [ 3 ],
//   [ 1, 1, 1 ],
//   [ 1, 2 ]
// ]

// console.log(combos(10));
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
