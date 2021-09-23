import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';

@NgModule({
  declarations: [CalendarComponent],
  exports: [CalendarComponent],
  imports: [BrowserModule, CommonModule],
})
export class CalendarModule {}
