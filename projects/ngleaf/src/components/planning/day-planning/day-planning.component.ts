import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PlanningEvent } from '../models';
import { addEvent, createSlotsArray, finetuneSlots, Group } from './day-planning.helper';

export type PositionedPlanningEvent = PlanningEvent & {position?: {columnIndex: number, from: number, to: number, pFrom: string, pTo: string}}

@Component({
  selector: 'leaf-day-planning',
  templateUrl: './day-planning.component.html',
  styleUrls: ['./day-planning.component.scss']
})
export class DayPlanningComponent implements OnChanges {
  @Input()
  public day: number = 1;

  @Input()
  public month: number | undefined;

  @Input()
  public year: number | undefined;

  @Input()
  public events: PositionedPlanningEvent[] = [];

  @Output()
  public onDateClicked: EventEmitter<Date> = new EventEmitter<Date>();

  public dayEvents: PositionedPlanningEvent[] = [];

  public groups: Group[] = [];

  constructor() { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.events) {
      this.updateEvents();
    }
  }

  public updateEvents() {
    const today = new Date();
    const beginningOfDay = new Date(new Date(this.year || today.getFullYear(), this.month - 1 || today.getMonth(), this.day));
    const endOfDay = new Date(new Date(this.year || today.getFullYear(), this.month - 1 || today.getMonth(), this.day, 23, 59, 59, 999));
    const filteredEvents = this.events.filter((event) => event.from.getTime() < endOfDay.getTime() && event.to.getTime() > beginningOfDay.getTime()).sort((e1, e2) => e1.from.getTime() - e2.from.getTime());

    const slots = createSlotsArray();

    filteredEvents.forEach((event) => addEvent(slots, event, beginningOfDay, endOfDay));

    this.groups = finetuneSlots(slots);

    this.dayEvents = filteredEvents;
  }
}
