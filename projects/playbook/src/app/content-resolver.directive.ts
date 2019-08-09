import {
  ComponentFactoryResolver,
  Directive,
  DoCheck,
  Host,
  Injector,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
  Type
} from '@angular/core';
import {ComponentDynamicEntity, InputComponent, OutputComponent} from '../../../ng-torque/src/lib/entity/component-dynamic.entity';
import {WrapperComponent} from './wrapper.component';

@Directive({
  selector: '[componentResolver]'
})
export class ContentResolverDirective<T> implements OnChanges, DoCheck {
  @Input() public type!: Type<T>;
  @Input() public input!: InputComponent<T>;
  @Input() public output!: OutputComponent<T>;
  public entity!: ComponentDynamicEntity<T>;


  constructor(@Host() public wrapper: WrapperComponent,
              private injector: Injector,
              private resolver: ComponentFactoryResolver) {
  }

  get viewRef() {
    return this.wrapper.viewRef;
  }

  get templateRef() {
    return this.wrapper.content;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.type) {
      this.viewRef.clear();
      this.entity = new ComponentDynamicEntity({
        type: this.type,
        input: this.input,
        output: this.output
      });
      this.entity.factory = this.resolver.resolveComponentFactory(this.entity.type);
      let componentRef = null;
      if (this.entity.hasNgContent) {
        const content = this.viewRef.createEmbeddedView(this.templateRef);
        componentRef = this.viewRef.createComponent(this.entity.factory, 0, this.injector, [content.rootNodes]);
      } else {
        componentRef = this.viewRef.createComponent(this.entity.factory, 0, this.injector);
      }
      this.entity.setFactory(this.entity.factory);
      this.entity.setComponentRef(componentRef);
    }
    if (changes.input) {
      const {previousValue, currentValue} = changes.input;
      const simpleChanges: SimpleChanges = {};
      if (currentValue) {
        Object
          .keys(this.input)
          .filter(key => (previousValue && previousValue[key]) !== currentValue[key])
          .forEach(key => {
            const prev = previousValue && previousValue[key];
            const current = currentValue[key];
            simpleChanges[key] = new SimpleChange(prev, current, changes.input.isFirstChange());
          });
        this.entity.input = changes.input.currentValue;
        this.entity.attachInputs();
        this.entity.ngOnChanges(simpleChanges);
      }
    }

    if (changes.output) {
      this.entity.output = changes.output.currentValue;
      this.entity.attachOutputs();
    }
  }

  public ngDoCheck(): void {
    this.entity.ngDoCheck();
  }

}
