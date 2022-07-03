import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { NavHeaderComponent } from './components/nav-header/nav-header.component';
import { NavFooterComponent } from './components/nav-footer/nav-footer.component';
import { ChatComponent } from './components/chat/chat.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppEffects } from './store/effects/app.effects';
import { AppService } from './service/app.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers, APPLICATION_FEATURE_KEY } from './store/reducers';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ApplicationRoutingModule } from './application-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieInjectorInterceptor } from './interceptors/cookie-injector.interceptor';
import { PermissionsService } from './service/permissions.service';

let httpInterceptors = [{ provide: HTTP_INTERCEPTORS, useClass: CookieInjectorInterceptor, multi: true }];

@NgModule({
  declarations: [
    LoginComponent,
    PageNotFoundComponent,
    HomeComponent,
    NavHeaderComponent,
    NavFooterComponent,
    ChatComponent,
    DashboardComponent,
  ],
  imports: [
    ApplicationRoutingModule,
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(APPLICATION_FEATURE_KEY, reducers),
    EffectsModule.forFeature([AppEffects]),
  ],
  providers: [AppService, PermissionsService, httpInterceptors],
  exports: [NavFooterComponent, NavHeaderComponent],
})
export class ApplicationModule {}
