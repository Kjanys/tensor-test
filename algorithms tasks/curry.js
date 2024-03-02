function abc(a, b, c) {
  return a + b + c;
}

function abcdef(a, b, c, d, e, f) {
  return a + b + c + d + e + f;
}
// возможно я не так понял задание, тогда прототипы лишние и можно оставить только каррирование
abc.prototype.curry = curry(abc);
abcdef.prototype.curry = curry(abcdef);

// прокидываем внутрь функцию
function curry(func) {
  return function curried(...args) {
    // если количество аргументов тоже, то переходим к ней
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else { // если не тоже, то вызываем снова curried, кидая внутрь предыдущие аргументы с новыми. И так по кругу
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };
}

new abc().curry("A")("B")("C"); // 'ABC'
new abc().curry("A", "B")("C"); // 'ABC'
new abc().curry("A", "B", "C"); // 'ABC'

new abcdef().curry("A")("B")("C")("D")("E")("F"); // 'ABCDEF'
new abcdef().curry("A", "B", "C")("D", "E", "F"); // 'ABCDEF'

// Так же метод curry() есть в библиотеке lodash

