import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HospitalPicsRoutingModule } from './hospital-pics-routing.module';
import { AllPicsComponent } from './all-pics/all-pics.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDialogComponent } from './all-pics/dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './all-pics/dialogs/delete/delete.component';

@NgModule({
  declarations: [AllPicsComponent, FormDialogComponent, DeleteDialogComponent],
  imports: [
    CommonModule,
    HospitalPicsRoutingModule,
    ComponentsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class HospitalPicsModule {}
