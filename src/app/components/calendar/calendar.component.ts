import { Component, Input, OnInit } from '@angular/core';
import { calendarState } from 'src/app/utils/types';
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
  public initialSelection: Date | null = null;
  public finalSelection: Date | null = null;
  private state: calendarState = 'idle';
  selectedRange: Array<Date> = [];

  @Input() dateClass: (data: Date) => string = (data) => '';

  constructor(private dateUtils: DateUtils) {
    this.currentMonth = new Date().getMonth();
    this.currentYear = new Date().getFullYear();
    this.weeksOfMonth = this.dateUtils.formatMonthToCalendar(
      this.dateUtils.getDaysofMonth(this.currentMonth)
    );
  }

  ngOnInit(): void {}

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
    let dayClass = '';
    let customClasses = this.dateClass(day);

    dayClass +=
      this.initialSelection &&
      this.dateUtils.isSameDay(day, this.initialSelection)
        ? ' initial-selection'
        : '';

    dayClass +=
      this.finalSelection && this.dateUtils.isSameDay(day, this.finalSelection)
        ? ' final-selection'
        : '';

    dayClass +=
      this.selectedRange.filter((date) => this.dateUtils.isSameDay(date, day))
        .length > 0
        ? ' is-selected'
        : '';

    dayClass += `${dayClass} ${customClasses}`;

    return dayClass;
  }

  handleState(date: Date) {
    console.log('called state; state: ', this.state);
    console.log('input date: ', date);
    switch (this.state) {
      case 'idle':
        this.initialSelection = date;
        this.state = 'selecting';
        break;
      case 'selecting':
        if (
          this.initialSelection &&
          !this.dateUtils.isSameDay(date, this.initialSelection)
        ) {
          this.finalSelection = date;
          this.state = 'selected';
          this.selectedRange = this.dateUtils.makePeriodArray(
            this.initialSelection,
            this.finalSelection
          );
          const checkOrder = this.dateUtils.checkOrder(
            this.initialSelection,
            this.finalSelection
          );
          this.initialSelection = checkOrder.initialDay;
          this.finalSelection = checkOrder.finalDay;
        }
        break;
      case 'selected':
        this.initialSelection = date;
        this.finalSelection = new Date(0);
        this.state = 'selecting';
        this.selectedRange = [];
        break;
    }
  }
}
