import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from './calendar/calendar.module';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  declarations: [],
  exports: [],
  imports: [BrowserModule, CommonModule, FormsModule, CalendarModule],
})
export class ComponentsModule {}
