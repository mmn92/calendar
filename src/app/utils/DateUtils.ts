import {
  startOfWeek,
  endOfWeek,
  daysInWeek,
  daysOfWeek,
} from '../constants/days';

export class DateUtils {
  addDays(date: Date, days: number) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);

    return result;
  }

  getBegginingOfWeek(date: Date) {
    const day = date.getDay();

    return this.addDays(date, startOfWeek - day);
  }

  getEndOfWeek(date: Date) {
    const day = date.getDay();

    return this.addDays(date, endOfWeek - day);
  }

  isSameDay(day1: Date, day2: Date) {
    return day1.getTime() === day2.getTime();
  }

  isDateinWeek(date: Date, week: Array<Date>) {
    // TODO: swap for isSameDay
    return week.filter((day) => day.getTime() === date.getTime()).length > 0;
  }

  populateWeek(date: Date) {
    const week = [];
    const start = this.getBegginingOfWeek(date);

    for (let i = 0; i < endOfWeek; i++) {
      week.push(this.addDays(start, i));
    }

    return week;
  }

  getDaysofMonth(month: number) {
    const daysOfMonth = [];
    let day = new Date(new Date().getFullYear(), month, 1);

    while (day.getMonth() === month) {
      daysOfMonth.push(day);
      day = this.addDays(day, 1);
    }

    return daysOfMonth;
  }

  formatWeekToUI(week: Array<Date>) {
    return week.reduce((acc, day) => {
      const weekDay = daysOfWeek[day.getDay()];
      if (weekDay && !acc[weekDay]) {
        acc[weekDay] = day;
      }

      return acc;
    }, {} as Record<string, Date>);
  }

  formatMonthToCalendar(month: Array<Date>): Array<Record<string, Date>> {
    const monthCopy = month.slice();
    const result = [];
    let firstDay = monthCopy[0];
    if (!firstDay) {
      return this.formatMonthToCalendar(
        this.getDaysofMonth(new Date().getMonth())
      );
    }
    let weekIteration = this.populateWeek(firstDay);
    result.push(this.formatWeekToUI(weekIteration));

    while (monthCopy.length) {
      if (
        !this.isSameDay(weekIteration[0], this.getBegginingOfWeek(firstDay))
      ) {
        weekIteration = this.populateWeek(firstDay);
        result.push(this.formatWeekToUI(weekIteration));
      }

      monthCopy.splice(0, 1);
      firstDay = monthCopy[0];
    }

    return result;
  }
}
