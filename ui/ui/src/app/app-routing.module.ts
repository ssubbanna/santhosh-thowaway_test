import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { environment as env } from '../environments/environment';

const routes: Routes =
  [
    {
      path: '',
      redirectTo: '',
      pathMatch: 'full'
    },
    {
      path: '',
      loadChildren: './features/features.module#FeaturesModule'
    },
    {
      path: '**',
      redirectTo: ''
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    useHash: env.hashLocationStrategy,
    enableTracing: env.enableTracing
  })],
  exports: [RouterModule],
  entryComponents: []
})
export class AppRoutingModule {
}
