import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTableTemplate]',
})
export class TableDirective {
  @Input() id: string = '';
  constructor(public templateRef: TemplateRef<any>) {}
}
