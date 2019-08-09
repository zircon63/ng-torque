import {AfterViewInit, Directive, DoCheck, Host, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ContentResolverDirective} from './content-resolver.directive';

@Directive({
  selector: '[componentResolver][formControl]',
  exportAs: 'control',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useClass: ControlDirective,
      multi: true
    }
  ]
})
export class ControlDirective implements OnInit, DoCheck, AfterViewInit, ControlValueAccessor {
  private valueAccessor!: ControlValueAccessor;
  private onChange: Function;
  private onTouched: Function;
  private _value: any;
  private isDisabled: boolean;

  constructor(@Host() public contentResolverDirective: ContentResolverDirective<any>) {
  }

  ngAfterViewInit(): void {
    const valueAccessors = this.contentResolverDirective.entity.ref.injector.get<ControlValueAccessor[]>(NG_VALUE_ACCESSOR);
    this.valueAccessor = valueAccessors[0];
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    if (this.valueAccessor) {
      this.valueAccessor.setDisabledState(isDisabled);
    }
  }

  writeValue(obj: any): void {
    this._value = obj;
    if (this.valueAccessor) {
      this.valueAccessor.writeValue(obj);
    }
  }

  ngDoCheck(): void {

  }

  ngOnInit(): void {
    this.valueAccessor.registerOnChange(this.onChange);
    this.valueAccessor.registerOnTouched(this.onTouched);
    this.valueAccessor.setDisabledState(this.isDisabled);
    this.valueAccessor.writeValue(this._value);
  }

}
