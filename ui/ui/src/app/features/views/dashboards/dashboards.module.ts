import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { routing } from './dashboards-routing.module';
import { DashboardOverviewComponent } from './overview/overview.component';
import { SharedCoreModule } from '../../../shared/shared.module';
import { FeaturesComponentsModule } from '../../components/features-components.module';
import { GaugeModule } from 'angular-gauge';
import { NgxGaugeModule } from 'ngx-gauge';

@NgModule({
  imports: [
    routing,
    SharedCoreModule,
    HttpClientModule,
    FeaturesComponentsModule,
    ChartsModule,
    GaugeModule.forRoot(),
    NgxGaugeModule
  ],
  declarations: [
    DashboardOverviewComponent
  ]
})
export class DashboardsModule {
}
