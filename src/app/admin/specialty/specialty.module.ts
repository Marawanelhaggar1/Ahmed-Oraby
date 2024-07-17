import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialtyRoutingModule } from './specialty-routing.module';
import { AddSpecialtyComponent } from './add-specialty/add-specialty.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllSpecialitiesComponent } from './all-specialities/all-specialities.component';
import { SpecialtyService } from '@core/service/specialty.service';
import { ServiceService } from './all-specialities/service.service';
import { FormDialogComponent } from './all-specialities/dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './all-specialities/dialogs/delete/delete.component';

@NgModule({
  declarations: [
    AddSpecialtyComponent,
    AllSpecialitiesComponent,
    FormDialogComponent,
    DeleteDialogComponent,
  ],
  imports: [
    ComponentsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,

    SpecialtyRoutingModule,
  ],
  providers: [SpecialtyService, ServiceService],
})
export class SpecialtyModule {}
