import { Action } from '@ngrx/store';
import { DialogService } from '../../../shared/dialogs/dialogs.service';


export namespace DialogActions {
  export const OPEN_CONFIRM_DIALOG = '[Dialogs] Open Confirm Dialog';
  export const OPEN_MESSAGE_DIALOG = '[Dialogs] Open Message Dialog';
  export const OPEN_ONBOARDING_DIALOG = '[Dialogs] Open Onboarding Dialog';
  export const CLEAR_ALL_DIALOGS = '[Dialogs] Clear All Dialogs';


  export class OpenConfirmDialog implements Action {
    readonly type = OPEN_CONFIRM_DIALOG;

    constructor(public payload: {
      confirmAction?: Action,
      confirmText?: string,
      cancelAction?: Action,
      cancelText?: string,
      text: string,
      title: string,
    }) {
    }
  }

  export class OpenMessageDialog implements Action {
    readonly type = OPEN_MESSAGE_DIALOG;

    constructor(public payload: {
      text: any,
      title: string
    }) {
    }
  }

  export class ClearOpenDialogs implements Action {
    readonly type = CLEAR_ALL_DIALOGS;

    constructor(public _dialogService: DialogService) {
      const dialogs = this._dialogService.getAllDialogs();
      for (let i = 0; i < dialogs.length; i++) {
        dialogs[i].ref.close();
      }
      this._dialogService.deleteAllDialogs();
    }
  }
}
