export type Week = Array<number | undefined>;
export type Slice = Array<Week>;
export type CustomDate = {
  y: number;
  m: number;
  d: number;
};
export type CustomDateRange = [CustomDate, CustomDate];
export type DateRange = {
  start: Date;
  end: Date;
};
export type MonthTails = {
  prev: Week;
  next: Week;
};

export interface Slices {
  [key: string]: Slice;
}
export interface Options {
  selectingRange: boolean;
}