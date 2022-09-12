import { Component, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, distinctUntilChanged, filter, map, Observable, ReplaySubject, startWith, Subject } from 'rxjs';
import { selectStatisticsData } from '../../../store/index';
import { LeafStatistic } from '../../../api/models/index';
import { ChartSerie } from './chart.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'leaf-statistics-viewer',
  templateUrl: './statistics-viewer.component.html',
  styleUrls: ['./statistics-viewer.component.scss']
})
export class StatisticsViewerComponent {

  @Input()
  public key: string;

  @Input()
  public showDatePicker: boolean = true;

  @Input()
  public datePickerPosition: 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft' = 'topRight';

  public series$: Observable<ChartSerie[]>;

  public dateRange$: Observable<{start: Date | undefined, end: Date | undefined}>;

  public dateRangeFormGroup: FormGroup;

  constructor(private store: Store) {
    this.dateRangeFormGroup = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });

    this.dateRange$ = this.dateRangeFormGroup.valueChanges;

    this.clearDateRange();
    this.series$ = combineLatest([
      this.store.pipe(
        select(selectStatisticsData),
        filter((statistics: LeafStatistic[]) => !!statistics),
        map((statistics: LeafStatistic[]) => statistics.map(
          (statistic: LeafStatistic) => ({
            date: statistic.creationDateTime,
            data: statistic.data[this.key]
          })
        ))
      ),
      this.dateRange$.pipe(startWith({start: undefined, end: undefined}), distinctUntilChanged())
    ]).pipe(
      map(([data, range]) => {
        const filteredData = data.filter(dat => !!dat.data).filter(data => {
          if (range.start && new Date(data.date).getTime() < range.start.getTime()) {
            return false;
          }
          if (range.end && new Date(data.date).getTime() > range.end.getTime()) {
            return false;
          }
          return true;
        });
        return [{
          name: this.key,
          series: filteredData.map((dat) => ({
            name: this.dateToString(dat.date),
            value: dat.data
          }))
        }]
      })
    );
  }

  private dateToString(date: Date) {
    return date.toString();
  }

  public clearDateRange() {
    this.dateRangeFormGroup.controls.start.setValue(undefined);
    this.dateRangeFormGroup.controls.end.setValue(undefined);
  }
}
