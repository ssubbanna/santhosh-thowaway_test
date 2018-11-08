import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SystemActions } from '../../../state/actions/systems.actions';
import { Store } from '@ngrx/store';
import { AppStore } from '../../../../core/state/app-store.interface';
import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardOverviewComponent implements OnInit {

  widgets;
  constructor(private store: Store<AppStore>) {
  }

  ngOnInit() {
    /*this.widgets = [
      {name: 'SITE AVAILABILITY', size: 'col-md-6 col-lg-6 col-xl-4 col-sm-12 xol-xs-12'},
      {name: 'PORT CAPACITY', size: 'col-md-6 col-lg-6 col-xl-4  col-sm-12 xol-xs-12'},
      {name: 'PORT HEALTH', size: 'col-md-6 col-lg-6 col-xl-4  col-sm-12 xol-xs-12'},
      {name: 'DEVICE AVAILABILITY', size: 'col-md-6 col-lg-6 col-xl-4  col-sm-12 xol-xs-12'},
      {name: 'ARCHIVED DEVICES', size: 'col-md-6 col-lg-6 col-xl-4  col-sm-12 xol-xs-12'},
      {name: 'DEVICES FIRMWARE', size: 'col-md-6 col-lg-6 col-xl-4  col-sm-12 xol-xs-12'},
    ];*/
  }

  fetchChartData(data) {
    const widgetData = [];
    // console.log('Chart data', data);
    _.forEach(data.chartData, function(chart) {
      widgetData.push(
        {
          size: 'col-md-6 col-lg-6 col-xl-4 col-sm-12 xol-xs-12',
          value: chart.value,
          maxValue: chart.totalValue,
          name: chart.displayName,
          tooltip: chart.tooltip,
          actions: chart.summaries,
          class: chart.impactStatus
        }
        );
    });
    this.widgets = widgetData;
  }
}

