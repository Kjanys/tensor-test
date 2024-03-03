#### Node version: 16.17.1
[![Build](https://github.com/Kjanys/tensor-test/actions/workflows/main.yml/badge.svg)](https://github.com/Kjanys/tensor-test/actions/workflows/main.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/06685ccd-11e4-4a55-897f-6027ae6db859/deploy-status)](https://app.netlify.com/sites/profound-sprinkles-f0f8f1/deploys)
### Запуск:

- Установите node modules: `npm i`
- Запустите проект: `npm run start`

### Задание на алгоритмы:
1) Реализовать функцию curry таким образом, чтобы выполнялось:
```
    function abc(a, b, c) {
      return a + b + c;
    }
    
    function abcdef(a, b, c, d, e, f) {
      return a + b + c + d + e + f;
    }
    
    abc.curry('A')('B')('C'); // 'ABC'
    abc.curry('A', 'B')('C'); // 'ABC'
    abc.curry('A', 'B', 'C'); // 'ABC'
    
    abcdef.curry('A')('B')('C')('D')('E')('F'); // 'ABCDEF'
    abcdef.curry('A', 'B', 'C')('D', 'E', 'F'); // 'ABCDEF'
```

2) Реализовать функцию, которая создает глубокую копию (deep copy) объекта без использования JSON.stringify

### Задание на React + Typescript:
  Написать небольшое приложение на React + Typescript. Приложение пишется только через функции и хуки, классы использовать запрещено.

  
  Приложение должно содержать:
1) Таблица, которая может содержать произвольное кол-во колонок (от 5 до 15).
2) Данные в таблицу должны загружаться с локального стейта(любые фейковые данные, например новости или список сотрудников). Загружаться данные должны не все за раз, а с использованием подхода Infinite Loader (подгрузка новых данных по скроллу, при достижении конца отображаемых данных).
3) Стейт-менеджер (или его отсутствие, обосновать выбор или же отсутствие инструмента).
4) Форма создания новой записи в таблице, любая на ваш выбор. 
5) Реализовать возможность удаления записей
6) Код расположить в github. В github actions должна быть настроена сборка. (Если не знаете, то пропускаете с пометкой не знаком, слышал, использовал другие CI/CD и т.д.)

#### Примечание
1) Решил отказаться от стейт-менеджера в данном задании, так как работы со стейтами и данными не много. Если бы объем задания был бы больше использовал бы Redux + RTK.
2) Возможно отслеживание прокрутки до конца стоило сделать через IntersectionObserver, но я сделал через отслеживание скрола.
3) До этого с github actions не работал, но попытался сделать.
4) Так же развернул на Netlify (Бедж сверху README)
