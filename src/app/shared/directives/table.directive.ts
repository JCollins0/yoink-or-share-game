import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTableTemplate]',
})
export class TableDirective {
  constructor(public templateRef: TemplateRef<any>) {}

  @Input() id: string = '';
}
