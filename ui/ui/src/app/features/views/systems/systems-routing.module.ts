import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {SystemsOverviewComponent} from './systems-overview/systems-overview.component';


const routes: Routes = [{
  path: '',
  component: SystemsOverviewComponent,
  data: {
    title: 'Overview Dashboard'
  }
}];

export const systemsRouting: ModuleWithProviders = RouterModule.forChild(routes);
