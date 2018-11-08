import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MatIconRegistry } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppCoreModule } from './core/app-core.module';
import { WindowRef } from './shared/utils/windowRef';

const appServices = [
  WindowRef
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppCoreModule.forRoot(),
    AppRoutingModule
  ],
  providers: [...appServices],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private matIconRegistry: MatIconRegistry
  ) {
    // Register Font Awesome
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
    matIconRegistry.registerFontClassAlias('material-design', 'icon');
  }
}
