import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { LayoutActions } from '../../../state/actions/layout.actions';
import { select, Store } from '@ngrx/store';
import { AppStore } from '../../../state/app-store.interface';
import { MatSidenav } from '@angular/material';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { NavigationStart, Router, RouterEvent } from '@angular/router';

// @ts-ignore
@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss']
})
export class TopToolbarComponent implements OnInit, OnChanges, OnDestroy {
  logo;
  isLoading;
  domainNode;
  domainPath;

  @Input() sidenav: MatSidenav;
  private unsubscribe$: Subject<void> = new Subject<void>();
  routerSubscription: Subscription;
  constructor(private store: Store<AppStore>,
              private router: Router,) {
    this.logo = './assets/images/icons/extreme_grey.png';
    this.routerSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationStart)
      )
      .subscribe((event: RouterEvent) => {
        this.domainNode = undefined;
        this.domainPath = undefined;
      });
  }


  ngOnInit() {
    this.watchSystems();
  }

  watchSystems() {
    this.store.pipe(select(state => state), takeUntil(this.unsubscribe$))
      .subscribe((systems: any) => {
        if (systems.SystemsModule.systems.loading) {
          this.isLoading = true;
        }
        if (systems.SystemsModule.systems.error) {
          this.isLoading = false;
        }
        if (systems.SystemsModule.systems.successful === true) {
          const payload = systems.SystemsModule.systems;
          this.domainNode = payload.siteId.match(/:([^']+):/)[1];
          this.domainPath = payload.path;
          //  console.log('systems', payload);
        }
      });
  }

  ngOnChanges() {
  }

  openApps() {
    this.store.dispatch(new LayoutActions.ShowRightSideNav());
  }

  showMenuIcon(): boolean {
    return this.sidenav && !this.sidenav.opened;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.routerSubscription.unsubscribe();
  }
}
