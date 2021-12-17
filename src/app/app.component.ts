import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentMonth = 10;

  dateClass(day: Date) {
    let dayClass = '';

    const monthOfDay = day.getMonth();
    dayClass += monthOfDay === this.currentMonth ? ' regular-day' : ' fade-day';
    dayClass += day.getDate() === new Date().getDate() ? ' today' : '';

    return dayClass;
  }
}
