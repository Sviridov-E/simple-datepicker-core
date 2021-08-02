import DatepickerCore from './index';
import { MonthTails, Slice } from './types';

describe('Testing DatepickerCore methods', () => {
  const datepickerGlobal: DatepickerCore = new DatepickerCore();

  test('setShownDate method', () => {
    const picker: DatepickerCore = datepickerGlobal;
    picker.setShownDate(4, 2020);
    expect(picker.shownDate).toStrictEqual(new Date(2020, 4));
    picker.setShownDate(4);
    expect(picker.shownDate).toStrictEqual(
      new Date(new Date().getFullYear(), 4)
    );
  });
  test('setSelectedDate method', () => {
    const picker: DatepickerCore = datepickerGlobal;
    picker.setSelectedDate({ y: 2009, m: 4, d: 25 });
    expect(picker.selectedDate).toStrictEqual(new Date(2009, 4, 25));
  });
  test('_calcMonthSlice method', () => {
    let slice: Slice = [
      [undefined, undefined, undefined, undefined, undefined, 1, 2],
      [3, 4, 5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14, 15, 16],
      [17, 18, 19, 20, 21, 22, 23],
      [24, 25, 26, 27, 28, 29, undefined],
    ];
    expect(datepickerGlobal._calcMonthSlice(1, 2020)).toStrictEqual(slice);
    expect(datepickerGlobal.slices['12020']).toStrictEqual(slice);

    slice = [
      [undefined, 1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12, 13],
      [14, 15, 16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25, 26, 27],
      [28, 29, 30, undefined, undefined, undefined, undefined],
    ];
    expect(datepickerGlobal._calcMonthSlice(5, 2021)).toStrictEqual(slice);
    expect(datepickerGlobal.slices['52021']).toStrictEqual(slice);
  });
  test('getMonthTails method', () => {
    let monthTails: MonthTails = {
      prev: [27, 28, 29, 30, 31].concat(new Array(2)),
      next: new Array(6).concat([1]),
    };
    let result = datepickerGlobal.getMonthTails(1, 2020);
    expect(result).toStrictEqual(monthTails);
    monthTails = {
      prev: [25, 26, 27, 28, 29, 30, 31],
      next: [1, 2, 3, 4, 5, 6, 7],
    };
    result = datepickerGlobal.getMonthTails(1, 2021);
    expect(result).toStrictEqual(monthTails);
  });
});

describe('Testing static methods', () => {
  const argsCustom: Array<[number, number]> = [
    [2, 2021],
    [1, 2021],
    [8, 2020],
  ];
  const argsDate: Date[] = [
    new Date(2021, 2),
    new Date(2021, 1),
    new Date(2020, 8),
  ];
  test('getDaysInMonths', () => {
    const values: number[] = [31, 28, 30];
    argsCustom.forEach((arg, ind) => {
      const result: number = DatepickerCore.getDaysInMonth(...arg);
      expect(result).toBe(values[ind]);
    });
    argsDate.forEach((arg, ind) => {
      const result: number = DatepickerCore.getDaysInMonth(arg);
      expect(result).toBe(values[ind]);
    });
  });

  test('monthStartsWith', () => {
    const values: number[] = [0, 0, 1];
    argsCustom.forEach((arg, ind) => {
      const result: number = DatepickerCore.monthStartsWith(...arg);
      expect(result).toBe(values[ind]);
    });
    argsDate.forEach((arg, ind) => {
      const result: number = DatepickerCore.monthStartsWith(arg);
      expect(result).toBe(values[ind]);
    });
  });
});
