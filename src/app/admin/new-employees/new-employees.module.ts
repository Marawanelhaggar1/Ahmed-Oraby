import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewEmployeesRoutingModule } from './new-employees-routing.module';
import { AllNewEmployeesComponent } from './all-new-employees/all-new-employees.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDialogComponent } from './all-new-employees/dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './all-new-employees/dialogs/delete/delete.component';

@NgModule({
  declarations: [
    AllNewEmployeesComponent,
    FormDialogComponent,
    DeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    NewEmployeesRoutingModule,
    ComponentsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class NewEmployeesModule {}
