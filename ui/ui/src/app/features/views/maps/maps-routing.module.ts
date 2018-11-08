import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {MapsOverviewComponent} from './maps-overview/maps-overview.component';


const routes: Routes = [{
  path: '',
  component: MapsOverviewComponent,
  data: {
    title: 'Overview Dashboard'
  }
}];

export const mapsRouting: ModuleWithProviders = RouterModule.forChild(routes);
