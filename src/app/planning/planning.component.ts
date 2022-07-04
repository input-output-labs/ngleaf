import { Component } from '@angular/core';

import {
  PlanningEvent,
} from '@input-output-labs/ngleaf';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent {
  public readonly EVENTS: PlanningEvent[] = [{
      id: 'a',
      from: new Date(2022, 5, 15, 12),
      to: new Date(2022, 5, 15, 13),
      label: 'RDV dentiste parceque les chico ça va pas fort en ce moment.',
      backgroundColor: 'blue'
    },
    {
      id: 'b',
      from: new Date(2022, 5, 15, 14),
      to: new Date(2022, 5, 15, 18),
      label: 'After dentiste',
      backgroundColor: 'darkred'
    },
    {
      id: 'c',
      from: new Date(2022, 5, 15, 9),
      to: new Date(2022, 5, 15, 15),
      label: 'After dentiste',
      backgroundColor: 'darkred'
    },
    {
      id: 'd',
      from: new Date(2022, 5, 20, 14),
      to: new Date(2022, 5, 20, 18),
      label: 'Soirée rigolotte',
      backgroundColor: 'darkgreen'
    },
    {
      id: 'e',
      from: new Date(2022, 5, 5, 21),
      to: new Date(2022, 5, 7, 9),
      label: 'Week end',
      backgroundColor: 'darkgreen'
    },
    {
      id: 'f',
      from: new Date(2022, 5, 15, 19),
      to: new Date(2022, 5, 15, 21),
      label: 'Apero',
      backgroundColor: 'darkred'
    }
  ];

  constructor() {}

  public onDateClicked(clickedDate: Date) {
    console.log('clickedDate: ', clickedDate);
  }

  public onEventClicked(clickedEvent: PlanningEvent) {
    console.log('clickedEvent: ', clickedEvent);
  }
}
