import { filter } from 'rxjs/operators';
import { Router, NavigationStart, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Store } from '@ngrx/store';
import { AppStore } from '../../../../state/app-store.interface';
import { LayoutActions } from '../../../../state/actions/layout.actions';
import { APPROUTES } from '../../../../../features/views/views-routes';
import { environment as env } from '../../../../../../environments/environment';

// @ts-ignore
@Component({
  selector: 'app-vertical-menu-collapsible',
  templateUrl: './vertical-menu-collapsible.component.html',
  styleUrls: ['./vertical-menu-collapsible.component.scss']
})
export class VerticalMenuCollapsibleComponent implements OnInit, OnDestroy {
  /**
   * Import material sidenav so we can access open close functions.
   */
  @Input() sidenav: MatSidenav;
  @Input() ShowMiniSideNav: boolean;
  routerSubscription: Subscription;
  momIcon;
  navItems;
  productName;

  constructor(private router: Router,
              private store: Store<AppStore>) {
    this.momIcon = './assets/images/icons/u1245.png';
    this.productName = env.appSettings.productName;
    this.routerSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationStart)
      )
      .subscribe((event: RouterEvent) => {
        if (this.sidenav && this.sidenav.mode === 'over' && this.sidenav.opened) {
          this.sidenav.close();
        }
      });
  }

  ngOnInit() {
    this.navItems = APPROUTES.filter(menuItem => menuItem);
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  toggleMiniSideNav() {
    this.store.dispatch(new LayoutActions.ToggleSidenavMini());
  }
}
