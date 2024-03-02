import { cloneDeep } from "lodash";

// Варианты глубокого копирования. Выбор зависит от задачи и проекта.

// глубокое копирование с использование библиотеки lodash, начал с него так как чаще всего копирую именно так
// из плюсов: JSON.parse(JSON.stringify(x)) работает хуже, так как обрабатывает только базовые объекты, остальные преобразуются
// из минусов: вес пакета
function deepCopyLodash(object: object): object {
  return cloneDeep(object);
}

// реализация через встроенную функцию structuredClone
// из плюсов: работает точно так же как lodash, только не нужно качать пакет
// из минусов: довольно новая, но на caniuse пишет что поддержка довольно большая. Не все может клонировать, например: функции, узлы DOM, прототипы объектов и т.д.
function deepCopyStructuredClone(object: object): object {
  return structuredClone(object);
}

// пример полифила cloneDeep из lodash через Object.assign (вариантов множество в зависимости от задачи, это один из них)
// из плюсов: не нужно качать пакеты, можно убрать проблемы с клонированием structuredClone (добавив дополнительные условия и обработки)
// из минусов: изобретение велосипеда, в большенстве случаев.
function deepClonePolyfill(object: any): any {
  if (object === null) return null;
  const clone = Object.assign({}, object);
  if (Array.isArray(object)) {
    clone.length = object.length;
    return Array.from(clone);
  }
  Object.keys(clone).forEach(
    (key) =>
      (clone[key] =
        typeof object[key] === "object"
          ? deepClonePolyfill(object[key])
          : object[key])
  );
  return clone;
}

// Вариант через JSON.parse(JSON.stringify(x)) не пишу, т.к. не нужен по условию задачи
