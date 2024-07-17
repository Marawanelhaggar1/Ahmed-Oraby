import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreasRoutingModule } from './areas-routing.module';
import { AddAreaComponent } from './add-area/add-area.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AreaService } from '@core/service/area.service';
import { AllAreasComponent } from './all-areas/all-areas.component';
import { FormDialogComponent } from './all-areas/dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './all-areas/dialogs/delete/delete.component';
import { ServiceService } from './all-areas/service.service';

@NgModule({
  declarations: [
    AddAreaComponent,
    AllAreasComponent,
    FormDialogComponent,
    DeleteDialogComponent,
  ],
  imports: [
    AreasRoutingModule,
    ComponentsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  providers: [AreaService, ServiceService],
})
export class AreasModule {}
