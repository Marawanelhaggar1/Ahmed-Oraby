import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSlidesComponent } from './add-slides/add-slides.component';
import { AllSlidesComponent } from './all-slides/all-slides.component';

const routes: Routes = [
  { path: 'add-slide', component: AddSlidesComponent },
  { path: 'all-slide', component: AllSlidesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SlidesRoutingModule {}
