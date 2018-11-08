import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AlarmsOverviewComponent } from './alarms-overview/alarms-overview.component';


const routes: Routes = [{
  path: '',
  component: AlarmsOverviewComponent,
  data: {
    title: 'Overview Alarms'
  }
}];

export const alarmsRouting: ModuleWithProviders = RouterModule.forChild(routes);
