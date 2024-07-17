import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllNewEmployeesComponent } from './all-new-employees/all-new-employees.component';

const routes: Routes = [{ path: '', component: AllNewEmployeesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewEmployeesRoutingModule {}
