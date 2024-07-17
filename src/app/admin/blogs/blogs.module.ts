import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsRoutingModule } from './blogs-routing.module';
import { AllBlogsComponent } from './all-blogs/all-blogs.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDialogComponent } from './all-blogs/dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './all-blogs/dialogs/delete/delete.component';

@NgModule({
  declarations: [AllBlogsComponent, FormDialogComponent, DeleteDialogComponent],
  imports: [
    BlogsRoutingModule,
    ComponentsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
})
export class BlogsModule {}
