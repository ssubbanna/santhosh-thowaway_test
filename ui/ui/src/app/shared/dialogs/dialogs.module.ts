import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from '../shared-material.module';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';


export const dialogs = [
  MessageDialogComponent,
  ConfirmDialogComponent
];

@NgModule({
  imports: [
    CommonModule,
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...dialogs
  ],
  exports: [],
  entryComponents: [
    ...dialogs
  ]
})
export class DialogsModule {
}
