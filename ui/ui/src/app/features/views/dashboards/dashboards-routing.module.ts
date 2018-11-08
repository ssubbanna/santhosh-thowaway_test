import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DashboardOverviewComponent } from './overview/overview.component';


const routes: Routes = [{
  path: '',
  component: DashboardOverviewComponent,
  data: {
    title: 'Overview Dashboard'
  }
}];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
