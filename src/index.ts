import {
  CustomDate,
  CustomDateRange,
  DateRange,
  MonthTails,
  Options,
  Slice,
  Slices,
  Week,
} from './types';

const defaultOptions: Options = {
  selectingRange: false
};

class DatepickerCore {
  initialDate: Date;
  selectedDate: Date | DateRange | null;
  shownDate: Date;
  slices: Slices;
  options: Options;
  constructor(options: Options = defaultOptions, initialDate?: Date) {
    this.initialDate = initialDate ?? new Date();
    this.selectedDate = null;
    this.shownDate = this.initialDate;
    this.slices = {};
    this.options = options;
    // Binding methods //////////////////////
    /*this.getMonthSlice = this.getMonthSlice.bind(this);
    this.cleanSlices = this.cleanSlices.bind(this);
    this._calcMonthSlice = this._calcMonthSlice.bind(this);*/
    /////////////////////////////////////////
  }

  // Seters ////////////////////////////////
  setShownDate(
    month: number,
    year: number = new Date().getFullYear()
  ): void {
    this.shownDate = new Date(year, month);
  }
  setSelectedDate(date: CustomDate | CustomDateRange): void {
    // if selecting one date
    if (!Array.isArray(date)) {
      this.selectedDate = new Date(date.y, date.m, date.d);
      return;
    }
    // if selecting range
    else {
      const dates: [Date, Date] = [
        new Date(date[0].y, date[0].m, date[0].d),
        new Date(date[1].y, date[1].m, date[1].d),
      ];
      const diff: number = Number(dates[1]) - Number(dates[0]);
      if (diff < 0) {
        this.selectedDate = {
          start: dates[1],
          end: dates[0],
        };
      } else {
        this.selectedDate = {
          start: dates[0],
          end: dates[1],
        };
      }
    }
  }
  ///////////////////////////////////////////
  // Work with Slices ///////////////////////
  cleanSlices(): void {
    this.slices = {};
  }
  getMonthSlice(
    month: number = new Date().getMonth(),
    year: number = new Date().getFullYear()
  ): Slice {
    let slice: Slice = this.slices[`${month}${year}`];
    if (!slice) {
      if (Object.keys(this.slices).length > 3) this.cleanSlices();

      slice = this._calcMonthSlice(month, year);
      this.slices[`${month}${year}`] = slice;
    }
    return slice;
  }
  _calcMonthSlice(
    month: number = new Date().getMonth(),
    year: number = new Date().getFullYear()
  ): Slice {
    let day: number = 1;
    let monthIsEnded: boolean = false;
    let daysInMonth: number = DatepickerCore.getDaysInMonth(month, year);
    let startsWith: number = DatepickerCore.monthStartsWith(month, year);
    let slice: Slice = [];
    while (!monthIsEnded) {
      let isFirstWeek: boolean = !slice.length;
      let week: Week = new Array(7);
      if (isFirstWeek) {
        for (let i = 0; i < 7 - startsWith; ++i) {
          week[startsWith + i] = day;
          ++day;
        }
      } else {
        for (let i = 0; i < 7; ++i) {
          week[i] = day;
          if (day === daysInMonth) {
            monthIsEnded = true;
            break;
          }
          ++day;
        }
      }
      slice.push(week);
    }
    this.slices[`${month}${year}`] = slice;
    return slice;
  }
  /////////////////////////////////////////

  getMonthTails(
    month: number = new Date().getMonth(),
    year: number = new Date().getFullYear()
  ): MonthTails {
    let prev: { month: number; year: number } = { month: month - 1, year },
      next: { month: number; year: number } = { month: month + 1, year };

    if (prev.month < 0) {
      --prev.year;
      prev.month += 12;
    }
    if (next.month > 11) {
      ++next.year;
      next.month -= 12;
    }
    return {
      prev: this.getMonthSlice(prev.month, prev.year).pop() ?? new Array(7),
      next: this.getMonthSlice(next.month, next.year)[0],
    };
  }

  static getDaysInMonth(month: number | Date, year?: number): number {
    if (typeof month !== 'number') {
      return new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    }
    return new Date(year ?? new Date().getFullYear(), month + 1, 0).getDate();
  }
  static monthStartsWith(
    month: number | Date,
    year?: number
  ): number {
    let result: number;
    if (typeof month !== 'number') {
      result = new Date(month.getFullYear(), month.getMonth()).getDay() - 1;
    } else {
      result = new Date(year ?? new Date().getFullYear(), month).getDay() - 1;
    }
    return result === -1 ? 6 : result;
  }
}

export default DatepickerCore;
