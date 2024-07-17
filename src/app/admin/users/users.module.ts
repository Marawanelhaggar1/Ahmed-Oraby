import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ViewUsersComponent } from './view-users/view-users.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDialogComponent } from './view-users/dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './view-users/dialogs/delete/delete.component';
import { ServiceService } from './view-users/service.service';
import { AuthService } from '@core';
import { AddAdminComponent } from './add-admin/add-admin.component';

@NgModule({
  declarations: [
    ViewUsersComponent,
    FormDialogComponent,
    DeleteDialogComponent,
    AddAdminComponent,
  ],
  imports: [
    UsersRoutingModule,
    ComponentsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  providers: [ServiceService, AuthService],
})
export class UsersModule {}
