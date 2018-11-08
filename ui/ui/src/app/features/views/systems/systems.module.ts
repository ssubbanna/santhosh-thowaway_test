import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { SystemsOverviewComponent } from './systems-overview/systems-overview.component';
import { systemsRouting } from './systems-routing.module';
import { SharedCoreModule } from '../../../shared/shared.module';
import { FeaturesComponentsModule } from '../../components/features-components.module';
import { NgSpinKitModule } from 'ng-spin-kit';

@NgModule({
  imports: [
    systemsRouting,
    SharedCoreModule,
    HttpClientModule,
    ChartsModule,
    FeaturesComponentsModule,
    NgSpinKitModule
  ],
  declarations: [
    SystemsOverviewComponent,
  ],
  entryComponents: [
  ]
})
export class SystemsModule {
}
