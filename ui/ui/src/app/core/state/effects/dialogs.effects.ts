import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { DialogService } from '../../../shared/dialogs/dialogs.service';
import { DialogActions } from '../actions/dialog.actions';
import { map, switchMap } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MessageDialogComponent } from '../../../shared/dialogs/message-dialog/message-dialog.component';
import { empty } from 'rxjs';

@Injectable()
export class DialogEffects {

  /**
   * @constructor
   * @param {Actions } actions$
   * @param _dialogService
   * @param matDialog
   */
  constructor(private actions$: Actions,
              private _dialogService: DialogService,
              private matDialog: MatDialog) {
  }

  /**
   * Open a confirmation dialog.
   */
  @Effect()
  openConfirmDialog$: Observable<Action> = this.actions$.pipe(
    ofType(DialogActions.OPEN_CONFIRM_DIALOG),
    map((action: DialogActions.OpenConfirmDialog) => action.payload),
    switchMap(payload => {
      const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
        position: { top: '80px' },
        backdropClass: 'main-backdrop',
        width: '600px',
        hasBackdrop: true,
        data: payload
      });
      this._dialogService.addDialog({ id: dialogRef.id, callingComponent: 'ConfirmDialogComponent', ref: dialogRef });
      return empty();
    })
  );

  /**
   * Open a message dialog.
   */
  @Effect()
  openMessageDialog$: Observable<Action> = this.actions$.pipe(
    ofType(DialogActions.OPEN_MESSAGE_DIALOG),
    map((action: DialogActions.OpenMessageDialog) => action.payload),
    switchMap(payload => {
      const dialogRef = this.matDialog.open(MessageDialogComponent, {
        position: { top: '80px' },
        backdropClass: 'main-backdrop',
        width: '600px',
        hasBackdrop: true,
        data: payload
      });
      this._dialogService.addDialog({ id: dialogRef.id, callingComponent: 'MessageDialogComponent', ref: dialogRef });
      return empty();
    })
  );


}
