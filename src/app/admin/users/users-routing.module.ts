import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewUsersComponent } from './view-users/view-users.component';
import { AddAdminComponent } from './add-admin/add-admin.component';

const routes: Routes = [
  { path: 'view-users', component: ViewUsersComponent },
  { path: 'add-admin', component: AddAdminComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
