import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCareerComponent } from './all-career/all-career.component';

const routes: Routes = [{ path: '', component: AllCareerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareerRoutingModule {}
