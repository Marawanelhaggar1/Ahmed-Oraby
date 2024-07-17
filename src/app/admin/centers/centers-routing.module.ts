import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCentersComponent } from './add-centers/add-centers.component';
import { AllCentersComponent } from './all-centers/all-centers.component';

const routes: Routes = [
  { path: 'add-centers', component: AddCentersComponent },
  { path: 'all-centers', component: AllCentersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CentersRoutingModule {}
