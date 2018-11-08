import { NgModule } from '@angular/core';
import { StructureTreeComponent } from './trees/structure-tree.component';
import { SharedCoreModule } from '../../shared/shared.module';
import { SystemsTreeComponent } from './trees/systems-tree.component';
import { AddNodeDialogComponent } from './dialogs/addNodeDialog/add-node-dialog.component';

@NgModule({
  imports: [
    SharedCoreModule
  ],
  declarations: [
    StructureTreeComponent,
    SystemsTreeComponent,
    AddNodeDialogComponent
  ],
  exports: [
    StructureTreeComponent,
    SystemsTreeComponent,
    AddNodeDialogComponent
  ],
  entryComponents: [
    AddNodeDialogComponent
  ],
  providers: []
})
export class FeaturesComponentsModule {
}
