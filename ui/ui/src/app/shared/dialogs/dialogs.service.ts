import { Injectable } from '@angular/core';
import { DialogModel } from '../models/dialog.model';


@Injectable()
export class DialogService {

  lastId = 0;
  dialogs: DialogModel[] = [];

  // Add in a dialog ref
  addDialog(dialog: DialogModel): DialogService {
    this.dialogs.push(dialog);
    return this;
  }

  // delete a dialog
  deleteDialogById(id: string): DialogService {
    const dialogs = this.dialogs;
    // console.log(this.dialogs.filter(dialog => dialog.id === id));
    this.dialogs.filter(function(el) {
      if (el.id === id) {
        //  console.log('got a match', el);
        const idx = dialogs.indexOf(el);
        dialogs.splice(idx, 1);
      }
    });
    return;
  }

  deleteCloseDialogById(id: string): DialogService {
    const dialogs = this.dialogs;
    this.dialogs.filter(function(el) {
      if (el.id === id) {
        const idx = dialogs.indexOf(el);
        dialogs[idx].ref.close();
        dialogs.splice(idx, 1);
      }
    });
    return;
  }

  // Delete all Dialogs
  deleteAllDialogs(): DialogService {
    this.dialogs = [];
    return;
  }

  // Get all Dialogs
  getAllDialogs(): DialogModel[] {
    return this.dialogs;
  }

}
