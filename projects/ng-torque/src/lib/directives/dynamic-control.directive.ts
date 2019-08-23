import {Directive, Host, Input, OnChanges, SimpleChanges} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  NG_ASYNC_VALIDATORS,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR
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
    const rawValidators = this.entityRef.injector.get(NG_VALIDATORS, null);
    const rawAsyncValidators = this.entityRef.injector.get(NG_ASYNC_VALIDATORS, null);
    const valueAccessors = this.entityRef.injector.get<ControlValueAccessor[]>(NG_VALUE_ACCESSOR);
    const formControlDirective = new FormControlDirective(rawValidators, rawAsyncValidators, valueAccessors, null);
    formControlDirective.form = this.formControl;
    const changesFormControl = {
      form: changes.formControl
    };
    formControlDirective.ngOnChanges(changesFormControl);
  }

}
