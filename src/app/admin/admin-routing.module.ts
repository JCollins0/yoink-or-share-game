import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { PageTitles } from './constants/app-constants';

const routes: Routes = [
  { path: '', component: UserListComponent, pathMatch: 'full', data: { title: PageTitles.USER_LIST } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
