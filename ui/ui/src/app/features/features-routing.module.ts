import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { ShellComponent } from '../core/layouts/shell/shell.component';

const routes: Routes =
  [
    {
      path: '',
      redirectTo: '/dashboard',
      pathMatch: 'full'
    },
    {
      path: '',
      data: {
        base: true
      },
      component: ShellComponent,
      children: [
        {
          path: 'dashboard',
          loadChildren: './views/dashboards/dashboards.module#DashboardsModule'
        },
        {
          path: 'systems',
          loadChildren: './views/systems/systems.module#SystemsModule'
        },
        {
          path: 'alarms',
          loadChildren: './views/alarms/alarms.module#AlarmsModule'
        },
        {
          path: 'maps',
          loadChildren: './views/maps/maps.module#MapsModule'
        }
      ]
    },
    {
      path: '**',
      redirectTo: ''
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  entryComponents: []
})
export class FeaturesRoutingModule {
  constructor(private router: Router) {
    /**
     * layout switcher.
     */
    const baseRoute = this.router.config.find(route => route.data !== undefined && route.data.base === true);
    switch (sessionStorage.getItem('app-layout')) {
      case 'default':
        baseRoute.component = ShellComponent;
        break;
      default:
        break;
    }
  }
}
