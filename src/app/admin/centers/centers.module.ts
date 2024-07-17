import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentersRoutingModule } from './centers-routing.module';
import { AddCentersComponent } from './add-centers/add-centers.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CenterService } from '@core/service/center.service';
import { AllCentersComponent } from './all-centers/all-centers.component';
import { ServiceService } from './all-centers/service.service';
import { FormDialogComponent } from './all-centers/dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './all-centers/dialogs/delete/delete.component';

@NgModule({
  declarations: [
    AddCentersComponent,
    AllCentersComponent,
    FormDialogComponent,
    DeleteDialogComponent,
  ],
  imports: [
    CentersRoutingModule,
    CommonModule,
    ComponentsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [CenterService, ServiceService],
})
export class CentersModule {}
