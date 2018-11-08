import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators/tap';
import { map } from 'rxjs/operators/map';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { switchMap } from 'rxjs/operators/switchMap';
import { catchError } from 'rxjs/operators/catchError';
import { NavigationStart, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { Action, Store } from '@ngrx/store';
import { AppStore } from '../../../core/state/app-store.interface';
import { SystemActions } from '../actions/systems.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { SystemsService } from '../../views/services/api/systems.service';

@Injectable()
export class SystemEffects {
  constructor(private actions$: Actions<Action>,
              private router: Router,
              private service: SystemsService,
              private store: Store<AppStore>) {
  }

  @Effect()
  getSiteDevices: Observable<Action> = this.actions$.pipe(
    ofType(SystemActions.GET_DEVICES_FOR_SITE),
    distinctUntilChanged(),
    debounceTime(500),
    switchMap((action: SystemActions.GetDevicesForSite) =>
      this.service
        .getSiteDevices(action.payload.siteId).pipe(
        map(systems => new SystemActions.GetDevicesForSiteSuccess({ systems })),
        catchError((error: HttpErrorResponse) => {
          return of(new SystemActions.GetDevicesForSiteError({ error }));
        })
      )
    )
  );

  @Effect()
  getSiteDevicesCloud: Observable<Action> = this.actions$.pipe(
    ofType(SystemActions.GET_DEVICES_FOR_SITE_CLOUD),
    distinctUntilChanged(),
    debounceTime(500),
    switchMap((action: SystemActions.GetDevicesForSiteCloud) =>
      this.service
        .getCloudSite(action.payload.id, action.payload.token).pipe(
        map(systems => new SystemActions.GetDevicesForSiteSuccessCloud({ systems })),
        catchError((error: HttpErrorResponse) => {
          console.log('running')
          return of(new SystemActions.GetDevicesForSiteErrorCloud({ error }));
        })
      )
    )
  );


}


