import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppButtonComponent } from './components/app-button/app-button.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { DatatableComponent } from './components/datatable/datatable.component';
import { TableDirective } from './directives/table.directive';

@NgModule({
  declarations: [AppButtonComponent, SpinnerComponent, TextInputComponent, DatatableComponent, TableDirective],
  imports: [CommonModule],
  exports: [AppButtonComponent, SpinnerComponent, TextInputComponent, DatatableComponent, TableDirective],
})
export class SharedModule {}
