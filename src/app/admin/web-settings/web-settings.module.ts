import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebSettingsRoutingModule } from './web-settings-routing.module';
import { AllSettingsComponent } from './all-settings/all-settings.component';
import { DeleteDialogComponent } from './all-settings/dialogs/delete/delete.component';
import { FormDialogComponent } from './all-settings/dialogs/form-dialog/form-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { ServiceService } from './all-settings/service.service';

@NgModule({
  declarations: [
    AllSettingsComponent,
    DeleteDialogComponent,
    FormDialogComponent,
  ],
  imports: [
    CommonModule,
    WebSettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [ServiceService],
})
export class WebSettingsModule {}
