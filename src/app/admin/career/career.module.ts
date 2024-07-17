import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareerRoutingModule } from './career-routing.module';

import { AllCareerComponent } from './all-career/all-career.component';
import { FormDialogComponent } from './all-career/dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './all-career/dialogs/delete/delete.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AllCareerComponent,
    FormDialogComponent,
    DeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    CareerRoutingModule,
    ComponentsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class CareerModule {}
