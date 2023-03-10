//date format: 1678452212622
const DateChecker = (date: number) => {
  const then = new Date(date);
  const [day, month, year] = [then.getDate(), then.getMonth(), then.getFullYear()];
  const [hour, minute, second] = [then.getHours(), then.getMinutes(), then.getSeconds()];
  return {
    getDay: () => day,
    getMonth: () => month,
    getYear: () => year,
    getHour: () => hour,
    getMinute: () => minute,
    getSecond: () => second,
    getThen: () => ({ hour, minute, second, day, month, year }),
    isGap: (time: string) => {
      // time format: 1s 30m, 1h, 1d, 1y
      const [timeNumber, timeType] = [time.slice(0, time.length - 1), time.slice(time.length - 1)];
      const now = new Date();
      const gapInSeconds = Math.round((now.getTime() - then.getTime()) / 1000);
      const gapInMinutes = Math.round(gapInSeconds / 60);
      const gapInHours = Math.round(gapInMinutes / 60);
      const gapInDays = Math.round(gapInHours / 24);
      const gapInYears = Math.round(gapInDays / 365);

      if (timeType === 's') {
        return gapInSeconds >= +timeNumber;
      }
      if (timeType === 'm') {
        return gapInMinutes >= +timeNumber;
      }
      if (timeType === 'h') {
        return gapInHours >= +timeNumber;
      }
      if (timeType === 'd') {
        return gapInDays >= +timeNumber;
      }
      if (timeType === 'y') {
        return gapInYears >= +timeNumber;
      }

      return false;
    },
    isSameMinute: (time: string) => {
      const now = new Date(+time);
      const [day2, month2, year2] = [now.getDate(), now.getMonth(), now.getFullYear()];
      return day === day2 && month === month2 && year === year2 && then.getMinutes() === now.getMinutes();
    },
    isSameHour: (time: string) => {
      const now = new Date(+time);
      const [day2, month2, year2] = [now.getDate(), now.getMonth(), now.getFullYear()];
      return day === day2 && month === month2 && year === year2 && then.getHours() === now.getHours();
    },
    isSameDay: (time: string) => {
      const now = new Date(+time);
      const [day2, month2, year2] = [now.getDate(), now.getMonth(), now.getFullYear()];
      return day === day2 && month === month2 && year === year2;
    },

    isSameYear: (time: string) => {
      const now = new Date(+time);
      const [, , year2] = [now.getDate(), now.getMonth(), now.getFullYear()];
      return year === year2;
    },
  };
};

export default DateChecker;

/*
 const [day2, month2, year2] = [d2.getDate(), d2.getMonth(), d2.getFullYear()];
      const [hour2, minute2, second2] = [d2.getHours(), d2.getMinutes(), d2.getSeconds()];
      const [hour, minute, second] = [d.getHours(), d.getMinutes(), d.getSeconds()];
      const [gapDay, gapMonth, gapYear] = [day2 - day, month2 - month, year2 - year];
      const [gapHour, gapMinute, gapSecond] = [hour2 - hour, minute2 - minute, second2 - second];
      console.log('isGap', gapDay, gapMonth, gapYear, gapHour, gapMinute, gapSecond);
      if (time.endsWith('y')) {
        return gapYear > ;
      }
      if (time.endsWith('d')) {
        return gapDay > 0;
      }
      if (time.endsWith('h')) {
        return gapHour > 0;
      }
      if (time.endsWith('m')) {
        return gapMinute > 0;
      }
      if (time.endsWith('s')) {
        return gapSecond > 0;
      }
      */
