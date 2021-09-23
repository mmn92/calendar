import { Component, OnInit } from '@angular/core';
import { DateUtils } from '../../utils/DateUtils';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  public daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  public monthsOfYear = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  public weeksOfMonth: Array<Record<string, Date>>;
  public currentMonth: number;
  public currentYear: number;

  constructor(private dateUtils: DateUtils) {
    this.currentMonth = new Date().getMonth();
    this.currentYear = new Date().getFullYear();
    this.weeksOfMonth = this.dateUtils.formatMonthToCalendar(
      this.dateUtils.getDaysofMonth(this.currentMonth)
    );
  }

  ngOnInit(): void {
    // console.log(
    //   this.dateUtils.formatMonthToCalendar(this.dateUtils.getDaysofMonth(8))
    // );
    console.log(Object.keys(this.weeksOfMonth[0]));
    // console.log(this.dateUtils.getDaysofMonth(8));
    // this.weeksOfMonth = this.dateUtils.formatMonthToCalendar(
    //   this.dateUtils.getDaysofMonth(8)
    // );
  }

  setNewMonth(month: number) {
    this.weeksOfMonth = this.dateUtils.formatMonthToCalendar(
      this.dateUtils.getDaysofMonth(month)
    );
  }

  clickLeft() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear = this.currentYear - 1;
    } else {
      this.currentMonth = this.currentMonth - 1;
    }
    this.setNewMonth(this.currentMonth);
  }

  clickRight() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear = this.currentYear + 1;
    } else {
      this.currentMonth = this.currentMonth + 1;
    }
    this.setNewMonth(this.currentMonth);
  }

  determineClass(day: Date) {
    console.log('called: ', day);
    const monthOfDay = day.getMonth();
    return monthOfDay === this.currentMonth ? 'regular-day' : 'fade-day';
  }
}
