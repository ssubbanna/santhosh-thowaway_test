import { filter } from 'rxjs/operators';
import { Router, NavigationStart, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Store } from '@ngrx/store';
import { AppStore } from '../../../../state/app-store.interface';
import { LayoutActions } from '../../../../state/actions/layout.actions';

// @ts-ignore
@Component({
  selector: 'app-switcher',
  templateUrl: './app-switcher.component.html',
  styleUrls: ['./app-switcher.component.scss']
})
export class AppSwitcherComponent implements OnDestroy, OnInit {
  @Input() sidenav: MatSidenav;
  routerSubscription: Subscription;
  navItems;

  constructor(private router: Router, private store: Store<AppStore>) {
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

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  ngOnInit() {
  }

  closeApps() {
    this.store.dispatch(new LayoutActions.CloseRightSideNav());
  }
}
