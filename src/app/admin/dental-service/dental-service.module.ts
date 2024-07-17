import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DentalServiceRoutingModule } from './dental-service-routing.module';
import { AllDentalServiceComponent } from './all-dental-service/all-dental-service.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDialogComponent } from './all-dental-service/dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './all-dental-service/dialogs/delete/delete.component';

@NgModule({
  declarations: [
    AllDentalServiceComponent,
    FormDialogComponent,
    DeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    DentalServiceRoutingModule,
    ComponentsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class DentalServiceModule {}
