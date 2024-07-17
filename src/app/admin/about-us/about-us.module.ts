import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AllAboutComponent } from './all-about/all-about.component';
import { FormDialogComponent } from './all-about/dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './all-about/dialogs/delete/delete.component';
import { SharedModule } from '@shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutService } from '@core/service/about.service';
import { ServiceService } from './all-about/service.service';
import { ComponentsModule } from '@shared/components/components.module';

@NgModule({
  declarations: [AllAboutComponent, FormDialogComponent, DeleteDialogComponent],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
  ],
  providers: [AboutService, ServiceService],
})
export class AboutUsModule {}
