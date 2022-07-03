import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { EditUserComponent } from './components/user-list/edit-user/edit-user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { PageTitles } from './constants/app-constants';

const routes: Routes = [
  { path: '', component: AdminHomeComponent, pathMatch: 'full', data: { title: PageTitles.ADMIN_HOME } },
  { path: 'users', component: UserListComponent, pathMatch: 'full', data: { title: PageTitles.USER_LIST } },
  { path: 'users/:id', component: EditUserComponent, data: { title: PageTitles.USER_LIST } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
