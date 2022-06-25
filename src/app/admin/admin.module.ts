import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';

@NgModule({
  declarations: [UserListComponent],
  imports: [CommonModule, SharedModule, AdminRoutingModule, StoreModule.forFeature('admin', reducers)],
})
export class AdminModule {}
