import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorScheduleRoutingModule } from './doctor-schedule-routing.module';
import { AllSchedulesComponent } from './all-schedules/all-schedules.component';
import { FormDialogComponent } from './all-schedules/dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './all-schedules/dialogs/delete/delete.component';
import { ScheduleService } from '@core/service/schedule.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { TimeToDatePipe } from 'app/time-to-date.pipe';

@NgModule({
  declarations: [
    AllSchedulesComponent,
    FormDialogComponent,
    DeleteDialogComponent,
    TimeToDatePipe,
  ],
  imports: [
    CommonModule,
    DoctorScheduleRoutingModule,
    ComponentsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [ScheduleService],
})
export class DoctorScheduleModule {}
