import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllAboutComponent } from './all-about/all-about.component';

const routes: Routes = [{ path: 'all-about', component: AllAboutComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutUsRoutingModule {}
