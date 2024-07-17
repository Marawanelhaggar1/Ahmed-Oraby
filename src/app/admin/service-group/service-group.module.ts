import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceGroupRoutingModule } from './service-group-routing.module';
import { AllSubServiceComponent } from './all-sub-service/all-sub-service.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { FormDialogComponent } from './all-sub-service/dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './all-sub-service/dialogs/delete/delete.component';

@NgModule({
  declarations: [
    AllSubServiceComponent,
    FormDialogComponent,
    DeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    ServiceGroupRoutingModule,
    ComponentsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ServiceGroupModule {}
