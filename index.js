// MAIN table structure:
// ID | YEAR | DAY | APPTS (fk)

// APPTS (normalized join) table structure:
// ID | MAIN_ID (fk) | APPT_ID (fk)

// APPT table structure:
// ID | TIME_START | TIME_END | TITLE | USER1 (fk) | USER2 (fk)
// ID | 0 | 3600 | APPTS -> user = "allDay"
//
// NOTE using datetime format would enable use of builtin database/language operations
// NOTE hours don't need to be represented. just year, day, and minutes (range) - minute 0-3600 for day
// NOTE USER1/2/etc. can be normalized -> ext table if reqs change
// NOTE TITLE is NOT unique key - used to gather recurring events (can be improved later)

// USERS table structure:
// ID | FIRST | LAST | TZ (could be -> opts serialized obj)
//
// NOTE timezone stored in users table - purely to aid UI as we are storing as UTC

// recurring APPT scenario:
// every monday 10am-11am
// calculate out what minutes == 10am, minutes -> 11am
// calculate out each day that is monday for range of time of repeat
// [10, 17, 24,]
// insert row for each of those days, point to APPT, APPT titles are identical

// NEED:
// function to get days in a month for a year
// function for days in year (could use above)
// function for day number -> day in month (using both above)
// TODO function to output data structure above
// TODO function to seed database with holidays/weekends pre-filled

// function for days in month (0-11)
const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

// function to generate month-days in year (helper)
const genYearMonths = (year) =>
  [...Array(12).keys()].map((month) => daysInMonth(year, month));

// function for days in year (0-365)
const daysInYear = (year) =>
  genYearMonths(year).reduce((acc, cur) => (acc += cur), 0) - 1;

// const daysInYear = (year) =>
//   [...Array(12).keys()].reduce(
//     (acc, cur) => (acc += daysInMonth(year, cur)),
//     0
//   ) - 1;

// function for day number -> day in month
// TODO memoization decorator
const dayInMonth = (year, day) => {
  const res = genYearMonths(year).reduce(
    (acc, cur, idx) => {
      if (!acc.month) {
        acc.count += cur;
        if (day <= acc.count) {
          acc.month = idx;
        }
      }

      return acc;
    },
    { count: 0, month: null }
  );

  return res.month;
};

// APPOINTMENTS data (app) structure:
//  MAP of years with
//   MAP of all days in a month in form of
//    {day: title: num}: {set of minute ranges consumed}}
let sample = {
  2020: {
    0: {
      7: {
        standup: {
          start: 60,
          end: 120,
        },
      },
      14: {
        standup: {
          start: 60,
          end: 120,
        },
      },
      21: {
        standup: {
          start: 60,
          end: 120,
        },
      },
    },
  },
}; // sample

// output obj for client
// input should be data (presumably from db) - the year, the associated days for that year, and the associated timeslices for each day
const outputMap = (input) => {
  year: genYearMonths().reduce((acc, cur, idx) => {});
};

// TODO -> asserts
console.log("days in month", daysInMonth(2020, 1));

console.log("days in year", daysInYear(2020));

console.log("year list", genYearMonths(2020));

console.log("day in month", dayInMonth(2020, 350));
