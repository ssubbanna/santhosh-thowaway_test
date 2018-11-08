import { ActionReducer, StoreModule } from '@ngrx/store';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment as env } from '../../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { SharedCoreModule } from '../shared/shared.module';
import { RouterEffects } from './state/effects/router.effects';
import { reducers } from './state/core.reducers';
import { DialogEffects } from './state/effects/dialogs.effects';
import { LayoutsModule } from './layouts/layouts.module';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    storage: sessionStorage,
    keys: ['layout'],
    rehydrate: true,
    removeOnUndefined: true
  })(reducer);
}

export const coreEffects = [
  RouterEffects,
  DialogEffects
];

@NgModule({
  imports: [
    SharedCoreModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers: [localStorageSyncReducer] }),
    EffectsModule.forRoot([
      ...coreEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 50,
      logOnly: env.production
    })
  ],
  providers: []
})
export class AppCoreModule {
  constructor(@Optional() @SkipSelf() parentModule: AppCoreModule) {
    if (parentModule) {
      throw new Error(
        'AppCoreModule is already loaded. Import in AppModule');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppCoreModule,
      providers: []
    };
  }
}
