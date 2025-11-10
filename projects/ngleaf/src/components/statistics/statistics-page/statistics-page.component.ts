import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../../services/index';

@Component({
  standalone: false,
  selector: 'leaf-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss']
})
export class StatisticsPageComponent implements OnInit {

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit() {
    this.statisticsService.fetchStatistics();
  }

}
