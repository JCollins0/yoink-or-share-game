import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PageTitles } from './constants/app-constants';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: PageTitles.login } },
  { path: 'home', component: HomeComponent, data: { title: PageTitles.home } },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent, data: { title: PageTitles.pageNotFound } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
