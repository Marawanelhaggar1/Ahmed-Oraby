import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlidesRoutingModule } from './slides-routing.module';
import { AddSlidesComponent } from './add-slides/add-slides.component';
import { SlidesService } from '@core/service/slides.service';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllSlidesComponent } from './all-slides/all-slides.component';
import { FormDialogComponent } from './all-slides/dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './all-slides/dialogs/delete/delete.component';

@NgModule({
  declarations: [
    AddSlidesComponent,
    AllSlidesComponent,
    FormDialogComponent,
    DeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    SlidesRoutingModule,
    ComponentsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [SlidesService],
})
export class SlidesModule {}
