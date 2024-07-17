import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionRoutingModule } from './promotion-routing.module';
import { AllPromotionComponent } from './all-promotion/all-promotion.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDialogComponent } from './all-promotion/dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './all-promotion/dialogs/delete/delete.component';

@NgModule({
  declarations: [
    AllPromotionComponent,
    FormDialogComponent,
    DeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    PromotionRoutingModule,
    ComponentsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class PromotionModule {}
