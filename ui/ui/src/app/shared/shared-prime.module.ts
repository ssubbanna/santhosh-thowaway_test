import { NgModule } from '@angular/core';
import { TableModule as PrimeTableModule } from 'primeng/table';
import { TreeModule as PrimeTreeModule } from 'primeng/tree';
import { ButtonModule as PrimeButtonModule } from 'primeng/button';
import { TabViewModule as PrimeTabViewModule } from 'primeng/primeng';
import { TooltipModule as PrimeTooltipModule } from 'primeng/tooltip';

const primeModules = [
  PrimeTableModule,
  PrimeTreeModule,
  PrimeButtonModule,
  PrimeTabViewModule,
  PrimeTooltipModule
];

@NgModule({
  imports: primeModules,
  exports: primeModules,
  providers: []
})
export class SharedPrimeModule {
}
