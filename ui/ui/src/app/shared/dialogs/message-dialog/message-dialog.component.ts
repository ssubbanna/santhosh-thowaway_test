import {
  Component,
  HostListener,
  Inject
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogService } from '../dialogs.service';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
                text: string,
                title: string
              },
              public dialogRef: MatDialogRef<MessageDialogComponent>,
              private _dialogService: DialogService) {
  }

  public close() {
    this.cleanupDialogRefs();
  }

  public ok() {
    this.cleanupDialogRefs();
  }

  @HostListener('keydown.esc')
  public onEsc() {
    this.close();
  }

  public cleanupDialogRefs() {
    const dialogs = this._dialogService.getAllDialogs();
    for (let i = 0; i < dialogs.length; i++) {
      if (dialogs[i].ref.id === this.dialogRef.id) {
        this._dialogService.deleteCloseDialogById(dialogs[i].id);
      }
    }
  }
}

