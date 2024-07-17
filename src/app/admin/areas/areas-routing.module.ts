import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAreaComponent } from './add-area/add-area.component';
import { AllAreasComponent } from './all-areas/all-areas.component';

const routes: Routes = [
  { path: 'add-area', component: AddAreaComponent },
  { path: 'all-area', component: AllAreasComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreasRoutingModule {}
