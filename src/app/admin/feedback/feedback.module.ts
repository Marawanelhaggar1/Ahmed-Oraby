import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { AllFeedbackComponent } from './all-feedback/all-feedback.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDialogComponent } from './all-feedback/dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './all-feedback/dialogs/delete/delete.component';

@NgModule({
  declarations: [
    AllFeedbackComponent,
    FormDialogComponent,
    DeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    ComponentsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class FeedbackModule {}
