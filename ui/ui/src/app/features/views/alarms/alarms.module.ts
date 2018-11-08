import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { alarmsRouting } from './alarms-routing.module';
import { AlarmsOverviewComponent } from './alarms-overview/alarms-overview.component';
import { SharedCoreModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    alarmsRouting,
    SharedCoreModule,
    HttpClientModule,
    ChartsModule
  ],
  declarations: [
    AlarmsOverviewComponent
  ]
})
export class AlarmsModule {
}
