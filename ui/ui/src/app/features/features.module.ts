import { NgModule } from '@angular/core';
import { FeaturesRoutingModule } from './features-routing.module';
import { LayoutsModule } from '../core/layouts/layouts.module';
import { SystemsService } from './views/services/api/systems.service';
import { SystemEffects } from './state/effects/systems.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SystemsReducer } from './state/reducers/systems.reducer';

const sharedServices = [
  SystemsService
];

const featureEffects = [
  SystemEffects
];

@NgModule({
  imports: [
    LayoutsModule,
    FeaturesRoutingModule,
    EffectsModule.forFeature(featureEffects),
    StoreModule.forFeature('SystemsModule', {
      systems: SystemsReducer.reducer
    }),
  ],
  declarations: [],
  providers: [...sharedServices]
})
export class FeaturesModule {
}
