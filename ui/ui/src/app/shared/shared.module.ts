import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MomentModule } from 'ngx-moment';
import { SharedMaterialModule } from './shared-material.module';
import { SharedPrimeModule } from './shared-prime.module';
import { ContentLoaderModule } from '@netbasal/content-loader';
import { DialogsModule } from './dialogs/dialogs.module';
import { DialogService } from './dialogs/dialogs.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SharedMaterialModule,
    SharedPrimeModule,
    MomentModule,
    ContentLoaderModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    HttpClientModule,
    DialogsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SharedMaterialModule,
    SharedPrimeModule,
    MomentModule,
    ContentLoaderModule
  ],
  providers: [
    DialogService
  ]
})
// SharedModule conflicts with other libs
export class SharedCoreModule {
  constructor() {

  }
}

