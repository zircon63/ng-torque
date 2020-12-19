import {Directive, Host, Input, OnChanges, SimpleChanges} from '@angular/core';
import {
  AsyncValidator, AsyncValidatorFn,
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  NG_ASYNC_VALIDATORS,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR, Validator, ValidatorFn
} from '@angular/forms';
import {ComponentResolverDirective} from './component-resolver.directive';

@Directive({
  selector: '[componentResolver][dynamicControl]',
  exportAs: 'dynamicControl',
})
export class DynamicControlDirective
  implements OnChanges {
  @Input('control') public formControl!: FormControl;

  constructor(@Host() public componentResolverDirective: ComponentResolverDirective<any>) {
  }

  get entityRef() {
    return this.componentResolverDirective.entity.ref;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const rawValidators = this.entityRef.injector.get<Array<Validator | ValidatorFn>>(NG_VALIDATORS, []);
    const rawAsyncValidators = this.entityRef.injector.get<Array<AsyncValidator | AsyncValidatorFn>>(NG_ASYNC_VALIDATORS, []);
    const valueAccessors = this.entityRef.injector.get<ControlValueAccessor[]>(NG_VALUE_ACCESSOR);
    const formControlDirective = new FormControlDirective(rawValidators, rawAsyncValidators, valueAccessors, null);
    formControlDirective.form = this.formControl;
    const changesFormControl = {
      form: changes.formControl
    };
    formControlDirective.ngOnChanges(changesFormControl);
  }

}
