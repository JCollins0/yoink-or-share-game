import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: forwardRef( () => TextInputComponent)
    }
  ]
})
export class TextInputComponent implements OnInit, ControlValueAccessor {

  @Input() label?: string;
  @Input() id?: string;
  @Input() type?: "text" | "password" | "area";
  @Input() autocomplete?: string = "";
  @Input("disabled") _disabled: boolean = false;
  @Input() value: string = "";
  onChange = (text: string) => {}
  touched: boolean = false;
  onTouched = () => {}
  disabled: boolean = false;

  constructor() { }
 
  ngOnInit(): void {
    this.setDisabledState(this._disabled)
  }

  updateText($event: Event): void {
    this.value = ($event.target as HTMLInputElement).value;
    this.markAsTouched();
    this.onChange(this.value);
  }

  markAsTouched(): void {
    if (!this.touched){
      this.onTouched();
      this.touched = true;
    }
  }

  public setDisabledState(disabled: boolean): void{
    this.disabled = disabled;
  }

  public writeValue(text: string): void {
    this.value = text;
  }
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }


}
