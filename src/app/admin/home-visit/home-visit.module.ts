import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllBookingsComponent } from './all-bookings/all-bookings.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDialogComponent } from './all-bookings/dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './all-bookings/dialogs/delete/delete.component';

import { HomeVisitRoutingModule } from './home-visit-routing.module';

@NgModule({
  declarations: [
    AllBookingsComponent,
    FormDialogComponent,
    DeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    HomeVisitRoutingModule,
    ComponentsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class HomeVisitModule {}
