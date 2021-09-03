# Simple Datepicker 
[![npm](https://img.shields.io/npm/v/@segor/simple-datepicker?label=npm)](https://www.npmjs.com/package/@segor/simple-datepicker) [![GitHub package.json version](https://img.shields.io/github/package-json/v/Sviridov-e/simple-datepicker-core?color=green&label=github)](https://github.com/Sviridov-E/simple-datepicker-core)

Данная библиотека написана в качестве вспомогательного инструмента при создании комопнента выбора даты. 

## Установка
```bash
npm install @segor/simple-datepicker
```
или
```bash
yarn add @segor/simple-datepicer
```

## Инициализация 
```ts
import DatepickerCore from "@segor/simple-datepicker";

const datepicker = new DatepickerCore();
```

## Методы

### getMonthSlice
```ts
const slice = datepicker.getMonthSlice(month?: number, year?:number);
```
Возвращает Slice элемент представляющий собой массив всех дней месяца, разбитых по неделям.
Последние месяца кеширует и сохраняет в свойство **slices**.
#### Например:
Результатом вызова
```ts
datepicker.getMonthSlice(6, 2021)
```
Будет
```ts
[
  [undefined, undefined, undefined, 1, 2, 3, 4],
  [5, 6, 7, 8, 9, 10, 11],
  [12, 13, 14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24, 25],
  [26, 27, 28, 29, 30, 31, undefined]
]
```
По данной структуре удобно проходить нативными методами массивов при создании календаря.

---
### getMonthTails
```ts
const tails = datepicker.getMonthTails(month?:  number, year?:number);
```
Возвращает объект с двумя свойствами:

 - **prev** - последняя неделя предыдущего месяца.
 - **next** - первая неделя следующего месяца.

#### Например:
Результатом вызова
```ts
datepicker.getMonthTails(6, 2021);
```
Будет
```ts
{
	prev: [28, 29, 30, undefined, undefined, undefined, undefined],
	next: [undefined, undefined, undefined, undefined, undefined, undefined, 1]
}
```
___
### setShownDate 
```ts
datepicker.setShownDate(month?: number, year?: number);
```
Устанавливает значение свойства **shownDate**. По умолчанию аргументы являются текущей датой.

---
### setSelectedDate 
```ts
datepicker.setSelectedDate(month?: number, year?: number);
```
Устанавливает значение свойства **selectedDate**. По умолчанию аргументы являются текущей датой.

---
### cleanSlices
```ts
datepicker.cleanSlices();
```
Очищает кэш с посчитаными месяцами.

## Статические методы

### getDaysInMonth
```ts
const daysInMonth: number = DatepickerCore.getDaysInMonth(month: number, year: number);
```
Или
```ts
const daysInMonth: number = DatepickerCore.getDaysInMonth(date: Date);
```
Возвращает количество дней в месяце.
#### Например:
```ts
DatepickerCore.getDaysInMonth(6, 2021) // returns 31
```

---
### monthStartsWith 
```ts
const weekDay: number = DatepickerCore.monthStartsWith(month:  number, year:  number);
```
Или
```ts
const weekDay: number = DatepickerCore.monthStartsWith(date: Date);
```
Возвращает день недели, с которого начинается месяц, в виде номера. Понедельник равен нулю.
#### Например:
```ts
DatepickerCore.monthStartsWith(6, 2021) // returns 3
```
## Свойства

### shownDate
```ts
const date: Date = datepicker.shownDate
```
Используется для хранения даты, месяц которой в данный момент отображен в календаре.

---
### selectedDate
```ts
const date: Date = datepicker.shownDate
```
Используется для хранения даты, которую выбрал пользователь.
