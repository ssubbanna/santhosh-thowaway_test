import {
  Component,
  HostListener,
  Inject
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Action, Store } from '@ngrx/store';
import { DialogService } from '../dialogs.service';
import { AppStore } from '../../../core/state/app-store.interface';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  options;
  countDown;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
                cancel?: Action,
                ok?: Action,
                text: string,
                title: string
              },
              public dialogRef: MatDialogRef<ConfirmDialogComponent>,
              private _dialogService: DialogService,
              private store: Store<AppStore>) {
    this.options = data;
  }

  public close() {
    this.cleanupDialogRefs();
  }

  public confirmAction() {
    this.store.dispatch(this.options.confirmAction);
    this.cleanupDialogRefs();
  }

  public cancelAction() {
    this.store.dispatch(this.options.cancelAction);
    this.cleanupDialogRefs();
  }

  public cleanupDialogRefs() {
    const dialogs = this._dialogService.getAllDialogs();
    // console.log('message dialog component', dialogs);
    for (let i = 0; i < dialogs.length; i++) {
      if (dialogs[i].ref.id === this.dialogRef.id) {
        this._dialogService.deleteCloseDialogById(dialogs[i].id);
      }
    }
  }

  @HostListener('keydown.esc')
  public onEsc() {
    this.close();
  }
}

