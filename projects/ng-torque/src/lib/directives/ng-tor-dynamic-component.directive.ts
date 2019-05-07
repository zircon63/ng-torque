import {
  ComponentFactoryResolver,
  Directive,
  DoCheck,
  Injector,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
  TemplateRef,
  Type,
  ViewContainerRef
} from '@angular/core';
import {ComponentDynamicEntity, InputComponent, OutputComponent} from '../entity/component-dynamic.entity';


@Directive({
  selector: '[ngTorDynamicComponent]',
  exportAs: 'ngTorDynamicComponent'
})
export class NgTorDynamicComponentDirective<T> implements OnChanges, DoCheck {
  @Input('ngTorDynamicComponent') public type!: Type<T>;
  @Input('ngTorDynamicComponentInput') public input!: InputComponent<T>;
  @Input('ngTorDynamicComponentOutput') public output!: OutputComponent<T>;
  public entity!: ComponentDynamicEntity<T>;

  constructor(
    protected templateRef: TemplateRef<never>,
    protected viewRef: ViewContainerRef,
    protected injector: Injector,
    protected resolver: ComponentFactoryResolver
  ) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const {previousValue, currentValue} = changes.input;
    const simpleChanges: SimpleChanges = {};
    Object
      .keys(this.input)
      .filter(key => (previousValue && previousValue[key]) !== currentValue[key])
      .forEach(key => {
        const prev = previousValue && previousValue[key];
        const current = currentValue[key];
        simpleChanges[key] = new SimpleChange(prev, current, changes.input.isFirstChange());
      });


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
      this.entity.input = changes.input.currentValue;
      this.entity.attachInputs();
      this.entity.ngOnChanges(simpleChanges);
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

