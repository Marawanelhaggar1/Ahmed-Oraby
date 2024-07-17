import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPicsComponent } from './all-pics/all-pics.component';

const routes: Routes = [{ path: '', component: AllPicsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HospitalPicsRoutingModule {}
