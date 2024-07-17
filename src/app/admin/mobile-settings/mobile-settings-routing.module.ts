import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllSettingsComponent } from './all-settings/all-settings.component';

const routes: Routes = [
  { path: 'all-mobile-settings', component: AllSettingsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileSettingsRoutingModule {}
