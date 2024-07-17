import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllSubServiceComponent } from './all-sub-service/all-sub-service.component';

const routes: Routes = [{ path: '', component: AllSubServiceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceGroupRoutingModule {}
