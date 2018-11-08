import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatTableModule,
  MatChipsModule,
  MatSliderModule,
  MatPaginatorModule,
  MatSortModule,
  MatExpansionModule,
  MatStepperModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatButtonToggleModule,
  MatIconRegistry,
  MatRadioModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

const matModules = [
  MatTooltipModule,
  MatSnackBarModule,
  CdkTableModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatToolbarModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatInputModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatAutocompleteModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatDialogModule,
  MatMenuModule,
  MatListModule,
  MatGridListModule,
  MatExpansionModule,
  MatCardModule,
  MatTabsModule,
  MatStepperModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatProgressBarModule
];

@NgModule({
  imports: matModules,
  exports: matModules,
  providers: [
    MatIconRegistry
  ]
})
export class SharedMaterialModule {
}
