import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllSchedulesComponent } from './all-schedules/all-schedules.component';

const routes: Routes = [{ path: '', component: AllSchedulesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorScheduleRoutingModule {}
