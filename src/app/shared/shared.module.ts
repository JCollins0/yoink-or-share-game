import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppButtonComponent } from './components/app-button/app-button.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { DatatableComponent } from './components/datatable/datatable.component';
import { TableDirective } from './directives/table.directive';
import { StoreModule } from '@ngrx/store';
import { reducers, SHARED_FEATURE_KEY } from './store/reducers';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';

@NgModule({
  declarations: [AppButtonComponent, SpinnerComponent, TextInputComponent, DatatableComponent, TableDirective],
  imports: [CommonModule, StoreModule.forFeature(SHARED_FEATURE_KEY, reducers)],
  exports: [AppButtonComponent, SpinnerComponent, TextInputComponent, DatatableComponent, TableDirective],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }],
})
export class SharedModule {}
