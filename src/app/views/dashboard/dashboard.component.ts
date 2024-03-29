import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import {
  EntityCollectionService,
  EntityCollectionServiceFactory,
} from '@ngrx/data';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  async,
  map,
  switchMap,
} from 'rxjs';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  toId: any;
  userInfo!: any;
  constructor(
    private user: UsersService,
    private chartsData: DashboardChartsData
  ) {}

  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month'),
  });

  // Initialize chartBarData with default values
  chartBarData = {
    labels: [],
    datasets: [
      {
        label: 'Products Sales',
        backgroundColor: '#f87979',
        data: [20, 30],
      },
    ],
  };

  async ngOnInit() {}

  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value);
    this.initCharts();
  }

  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
  }
}
