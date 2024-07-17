import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileSettingsRoutingModule } from './mobile-settings-routing.module';
import { AllSettingsComponent } from './all-settings/all-settings.component';
import { FormDialogComponent } from './all-settings/dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './all-settings/dialogs/delete/delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { ServiceService } from './all-settings/service.service';

@NgModule({
  declarations: [
    AllSettingsComponent,
    FormDialogComponent,
    DeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    MobileSettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [ServiceService],
})
export class MobileSettingsModule {}
