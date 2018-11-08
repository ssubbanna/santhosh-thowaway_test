import {
  Component,
  HostListener,
  Inject
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SystemsService } from '../../../views/services/api/systems.service';
import { DialogService } from '../../../../shared/dialogs/dialogs.service';
import { MyErrorStateMatcher } from '../../../../shared/utils/forms.util';
import { LocalStorage } from 'ngx-store';


@Component({
  selector: 'app-add-node-dialog',
  templateUrl: './add-node-dialog.component.html',
  styleUrls: ['./add-node-dialog.component.scss']
})
export class AddNodeDialogComponent {

  public addNodeForm: FormGroup;
  errorForms = new MyErrorStateMatcher();
  domainNodeType;
  domainNodeTypeList;
  selectedType;
  cloudAccounts;


  constructor(@Inject(MAT_DIALOG_DATA) public data: {},
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<AddNodeDialogComponent>,
              private _systemsService: SystemsService,
              private _dialogService: DialogService) {

    this.domainNodeType = {
      'xmc server': 'XMC Server',
      'extreme cloud': 'Extreme Cloud'
    };
    this.domainNodeTypeList = Object.keys(this.domainNodeType);

    this.selectedType = 'xmc server';
    this.addNodeForm = this.fb.group({
      type: ['xmc server', [<any>Validators.required]],
      userid: ['', [<any>Validators.required]],
      userpassword: ['', [<any>Validators.required]],
      port: ['8443', [<any>Validators.required]],
      address: ['', [<any>Validators.required]],
      id: ['', [<any>Validators.required]]
    });
  }

  updateForm(ev) {
    if (ev.value === 'extreme cloud') {
      this.addNodeForm.removeControl('port');
      this.addNodeForm.removeControl('address');
    }
    if (ev.value === 'xmc server') {
      this.addNodeForm.addControl('port', new FormControl('8443', Validators.required));
      this.addNodeForm.addControl('address', new FormControl('', Validators.required));
    }
  }

  public close() {
    this.cleanupDialogRefs();
  }

  public ok() {
    const payload = this.addNodeForm.getRawValue();
    if (payload.type === 'xmc server') {
      this.addXmcHost(payload);
    }
    if (payload.type === 'extreme cloud') {
      this.addCloudAccount(payload);
    }
  }

  public addCloudAccount(payload) {
    payload.token = '';
    this.cloudAccounts = JSON.parse(localStorage.getItem('cloudAccounts'));
    for (let i = 0; i < this.cloudAccounts.length; i++) {
      if (this.cloudAccounts[i].userid === payload.userid) {
        return;
      }
    }
    this.cloudAccounts.push(payload);
    localStorage.setItem('cloudAccounts', JSON.stringify(this.cloudAccounts));
  }

  public addXmcHost(payload) {
    this._systemsService.addDomainNode(payload)
      .subscribe(data => {
        this.cleanupDialogRefs();
      }, err => {
        if (err.status === 200 && err.statusText === 'OK') {
          this.cleanupDialogRefs();
        }
      });
  }

  @HostListener('keydown.esc')
  public onEsc() {
    this.close();
  }

  public cleanupDialogRefs() {
    const dialogs = this._dialogService.getAllDialogs();
    for (let i = 0; i < dialogs.length; i++) {
      if (dialogs[i].ref.id === this.dialogRef.id) {
        this._dialogService.deleteDialogById(dialogs[i].id);
      }
    }
  }
}

