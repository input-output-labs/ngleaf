import { Component, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { selectStatisticsData } from '../../../store/index';
import { LeafStatistic } from '../../../api/models/index';
import { ChartSerie } from './chart.model';

@Component({
  selector: 'leaf-statistics-viewer',
  templateUrl: './statistics-viewer.component.html',
  styleUrls: ['./statistics-viewer.component.scss']
})
export class StatisticsViewerComponent {

  @Input()
  public key: string;

  public series$: Observable<ChartSerie[]>;

  constructor(private store: Store) {
    this.series$ = this.store.pipe(
      select(selectStatisticsData),
      filter((statistics: LeafStatistic[]) => !!statistics),
      map((statistics: LeafStatistic[]) => statistics.map(
        (statistic: LeafStatistic) => ({
          date: statistic.creationDateTime,
          data: statistic.data[this.key]
        })
      )),
      map((data: {date: Date, data: number}[]) => [{
        name: this.key,
        series: data.map((dat) => ({
          name: this.dateToString(dat.date),
          value: dat.data
        }))
      }])
    );
  }

  private dateToString(date: Date) {
    return date.toString();
  }
}
