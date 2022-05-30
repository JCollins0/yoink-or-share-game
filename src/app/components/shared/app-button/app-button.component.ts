import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './app-button.component.html',
  styleUrls: ['./app-button.component.scss'],
})
export class AppButtonComponent {
  @Input() id: string = '';
  @Input() disabled: boolean = false;
  @Input() type?: string;
  @Input() class?: string;

  constructor() {}
}
