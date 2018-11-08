import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { mapsRouting } from './maps-routing.module';
import { MapsOverviewComponent } from './maps-overview/maps-overview.component';
import { SharedCoreModule } from '../../../shared/shared.module';
import { AgmCoreModule } from '@agm/core';
import { SystemsService } from '../services/api/systems.service';
import { NgSpinKitModule } from 'ng-spin-kit'


@NgModule({
  imports: [
    mapsRouting,
    SharedCoreModule,
    HttpClientModule,
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBbX3yaPByWCMO96dQJaqIw8UKNjD9-Au0'
    }),
    NgSpinKitModule
  ],
  declarations: [
    MapsOverviewComponent
  ],
  providers: [SystemsService]
})
export class MapsModule {
}
