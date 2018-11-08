import { Subject, Subscription } from 'rxjs';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStore } from '../../state/app-store.interface';
import { takeUntil } from 'rxjs/operators';
import { LayoutActions } from '../../state/actions/layout.actions';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, OnDestroy {
  /**
   * Stores if left sidenav is open.
   */
  leftSidenavOpen: boolean;
  /**
   * Stores left sidenav display mode.
   */
  leftSidenavMode: string;
  /**
   * Stores media observable subscription.
   */
  mediaSubscription: Subscription;

  private unsubscribe$: Subject<void> = new Subject<void>();

  /**
   * State of the sideNav
   */
  miniSideNav: boolean;
  /**
   * State of the AppSwitcher
   */
  showApps: boolean;

  fixed = false;

  constructor(
    private media: ObservableMedia,
    private store: Store<AppStore>
  ) {
  }

  ngOnInit(): void {
    // Get initial state of the sidenav.
    this.calculateSidenavStatus();
    // Subscribe to changes in screen size to change sidenav behavior.
    this.mediaSubscription = this.media
      .subscribe((change: MediaChange) => this.calculateSidenavStatus());

    this.store
      .select(l => l.layout)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(layout => {
        this.miniSideNav = layout.miniSideNav;
        this.showApps = layout.showRightSidenav;
      });

  }

  ngOnDestroy(): void {
    this.mediaSubscription.unsubscribe();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  calculateSidenavStatus(): void {
    const isMobile = this.media.isActive('lt-md');
    // Close sidenav on mobile.
    this.leftSidenavOpen = !isMobile;
    // Make sidenav open over content on mobile.
    this.leftSidenavMode = isMobile ? 'over' : 'side';
  }

  closeApps() {
    if (this.showApps) {
      this.store.dispatch(new LayoutActions.ToggleRightSideNav());
    }
  }
}
