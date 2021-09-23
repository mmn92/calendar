import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';

import { DateUtils } from './utils/DateUtils';
import { ComponentsModule } from './components/components.module';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from './components/calendar/calendar.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CommonModule, CalendarModule, FormsModule],
  providers: [DateUtils],
  bootstrap: [AppComponent],
})
export class AppModule {}
