import {
  ChangeDetectorRef,
  ComponentFactoryResolver,
  Directive,
  Injector,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  Type,
  ViewContainerRef
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  NG_ASYNC_VALIDATORS,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import {NgTorDynamicComponentDirective} from 'ng-torque/directives/ng-tor-dynamic-component.directive';
import {ComponentDynamicEntity, InputComponent, OutputComponent} from 'ng-torque/entity/component-dynamic.entity';

@Directive({
  selector: '[ngTorDynamicControl]',
  exportAs: 'ngTorDynamicControl'
})
export class NgTorDynamicControlDirective<T> extends NgTorDynamicComponentDirective<T> implements OnChanges {
  @Input('ngTorDynamicControl') public control!: FormControl;
  @Input('ngTorDynamicControlType') public type!: Type<T>;
  @Input('ngTorDynamicControlInput') public input!: InputComponent<T>;
  @Input('ngTorDynamicControlOutput') public output!: OutputComponent<T>;
  public entity!: ComponentDynamicEntity<T>;

  constructor(
    protected templateRef: TemplateRef<never>,
    protected viewRef: ViewContainerRef,
    protected injector: Injector,
    protected resolver: ComponentFactoryResolver,
    protected cdRef: ChangeDetectorRef
  ) {
    super(templateRef, viewRef, injector, resolver, cdRef);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    const rawValidators = this.entity.ref.injector.get(NG_VALIDATORS, null);
    const rawAsyncValidators = this.entity.ref.injector.get(NG_ASYNC_VALIDATORS, null);
    const valueAccessors = this.entity.ref.injector.get<ControlValueAccessor[]>(NG_VALUE_ACCESSOR);
    const formControlDirective = new FormControlDirective(rawValidators, rawAsyncValidators, valueAccessors, null);
    formControlDirective.form = this.control;
    const changesFormControl = {
      form: changes.control
    };
    formControlDirective.ngOnChanges(changesFormControl);

  }
}
