import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Layouts
import { SharedCoreModule } from '../../shared/shared.module';
import { ShellComponent } from './shell/shell.component';
import { TopToolbarComponent } from './components/top-toolbar/top-toolbar.component';
import { AppSwitcherComponent } from './components/menus/app-switcher/app-switcher.component';
import { VerticalMenuCollapsibleComponent } from './components/menus/vertical-menu-collapsible/vertical-menu-collapsible.component';
import { FooterFixedComponent } from './components/footer-fixed/footer-fixed.component';
import { FooterComponent } from './components/footer/footer.component';

const footers = [
  FooterFixedComponent,
  FooterComponent
];

const defaultShell = [
  ShellComponent,
  TopToolbarComponent,
  AppSwitcherComponent,
  VerticalMenuCollapsibleComponent
];

@NgModule({
  imports: [
    SharedCoreModule,
    RouterModule
  ],
  declarations: [
    ...defaultShell,
    ...footers
  ],
  providers: []
})
export class LayoutsModule {
}
