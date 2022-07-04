import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { sameDay } from '../helper';
import { CalendarDay, PlanningEvent, CalendarWeek } from '../models';

@Component({
  selector: 'leaf-month-planning',
  templateUrl: './month-planning.component.html',
  styleUrls: ['./month-planning.component.scss']
})
export class MonthPlanningComponent implements OnChanges {
  @Input()
  public month: number = 1;

  @Input()
  public year: number | undefined;

  @Input()
  public events: PlanningEvent[] = [];

  @Output()
  public onDateClicked: EventEmitter<Date> = new EventEmitter<Date>();

  public calendar: CalendarWeek[] = [];

  constructor() { }

  public ngOnChanges(changes: SimpleChanges): void {
    if(changes.month) {
      this.updateMonth();
    }
    if(changes.events) {
      this.updateEvents();
    }
  }

  private updateMonth() {
    const today = new Date();
    const firstDayOfMonth = new Date(this.year || today.getFullYear(), this.month - 1);

    const lastDayOfMonth = new Date(firstDayOfMonth);
    lastDayOfMonth.setMonth(firstDayOfMonth.getMonth() + 1);
    lastDayOfMonth.setDate(firstDayOfMonth.getDate() - 1);

    const dayToRemoveForFirstDate = firstDayOfMonth.getDay() - 1;
    const dayToAddForLastDate = 7 - lastDayOfMonth.getDay();

    const firstDateOfCalendar = new Date(firstDayOfMonth);
    firstDateOfCalendar.setDate(firstDayOfMonth.getDate() - dayToRemoveForFirstDate);
    const lastDateOfCalendar = new Date(firstDayOfMonth);
    lastDateOfCalendar.setDate(lastDayOfMonth.getDate() + dayToAddForLastDate);

    let counter = 0;
    this.calendar = [];
    let currentWeek: CalendarWeek = [];
    for (let currentDate = firstDateOfCalendar; currentDate <= lastDateOfCalendar; currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1)) {
      currentWeek.push({
        date: currentDate,
        day: currentDate.getDate(),
        isCurrentMonth: currentDate >= firstDayOfMonth && currentDate <= lastDayOfMonth,
        events: []
      });
      counter++;
      if (counter >= 7) {
        counter = 0;
        this.calendar.push([...currentWeek]);
        currentWeek = [];
      }
    }
    this.calendar.push([...currentWeek]);
    this.updateEvents();
  }

  private updateEvents() {
    this.clearAllEventsFromCalendar();
    this.events.sort((e1, e2) => e2.from.getTime() - e1.from.getTime());
    this.events.forEach((event: PlanningEvent) => {
      for (let currentDate = new Date(event.from); currentDate <= event.to; currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1)) {
        const calendarDay = this.findCalendarDay(currentDate);
        if (calendarDay) {
          calendarDay.events.push(event);
        }
      }
    });
  }

  private findCalendarDay(date: Date): CalendarDay | undefined {
    for(let calendarWeek of this.calendar) {
      for(let calendarDay of calendarWeek) {
        if (sameDay(calendarDay.date, date)) {
          return calendarDay;
        }
      }
    }
    return undefined;
  }

  public sameDay(date1: Date, date2: Date): boolean {
    return sameDay(date1, date2);
  }

  private clearAllEventsFromCalendar() {
    for(let calendarWeek of this.calendar) {
      for(let calendarDay of calendarWeek) {
        calendarDay.events = [];
      }
    }
  }
}
