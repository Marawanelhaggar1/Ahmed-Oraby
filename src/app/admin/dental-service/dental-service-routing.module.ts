import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllDentalServiceComponent } from './all-dental-service/all-dental-service.component';

const routes: Routes = [{ path: '', component: AllDentalServiceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DentalServiceRoutingModule {}
