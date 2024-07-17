import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPromotionComponent } from './all-promotion/all-promotion.component';

const routes: Routes = [{ path: '', component: AllPromotionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromotionRoutingModule {}
