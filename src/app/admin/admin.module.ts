import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { ADMIN_FEATURE_KEY, reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserListEffects } from './store/effects/user-list.effects';
import { EditUserComponent } from './components/user-list/edit-user/edit-user.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';

@NgModule({
  declarations: [UserListComponent, EditUserComponent, AdminHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    StoreModule.forFeature(ADMIN_FEATURE_KEY, reducers),
    EffectsModule.forFeature([UserListEffects]),
  ],
})
export class AdminModule {}
