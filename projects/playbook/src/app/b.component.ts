import {AfterContentInit, Component, forwardRef, Input, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import {provideViewQuery} from '../../../ng-torque/src/lib/directives/view-query.directive';
import {Query2Directive} from './query2.directive';

@Component({
  selector: 'b',
  template: `
      <p>B-COMPONENT: {{title}}</p>
      <input type="text" [formControl]="control"/>
      <ng-content></ng-content>
  `,
  styles: [`
      p {
          color: darkgreen;
      }
  `],
  providers: [
    provideViewQuery(Query2Directive),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => BComponent),
      multi: true
    },
  ]
})
export class BComponent implements OnInit, AfterContentInit, ControlValueAccessor, Validator {
  @Input() title!: string;
  public control = new FormControl();

  private validateFn = () => {
  };
  private change = (value: any) => {
  };

  constructor(private query: Query2Directive) {
  }

  ngOnInit() {
    this.control.valueChanges.subscribe(value => {
      this.change(value);
    });
  }

  ngAfterContentInit(): void {
    console.log(this);
  }

  registerOnChange(fn: any): void {
    this.change = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {

  }

  writeValue(obj: any): void {
    this.control.setValue(obj, {emitEvent: false});
  }

  registerOnValidatorChange(fn: () => void): void {
    this.validateFn = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    console.log(control.value);
    return Validators.required(control);
  }

}
