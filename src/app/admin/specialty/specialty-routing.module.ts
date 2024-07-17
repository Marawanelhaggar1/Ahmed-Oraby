import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSpecialtyComponent } from './add-specialty/add-specialty.component';
import { AllSpecialitiesComponent } from './all-specialities/all-specialities.component';

const routes: Routes = [
  { path: 'add-specialty', component: AddSpecialtyComponent },
  { path: 'all-specialty', component: AllSpecialitiesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecialtyRoutingModule {}
