import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingsRoutingModule } from './bookings-routing.module';
import { AllBookingsComponent } from './all-bookings/all-bookings.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDialogComponent } from './all-bookings/dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './all-bookings/dialogs/delete/delete.component';

@NgModule({
  declarations: [
    AllBookingsComponent,
    FormDialogComponent,
    DeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    BookingsRoutingModule,
    ComponentsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class BookingsModule {}
