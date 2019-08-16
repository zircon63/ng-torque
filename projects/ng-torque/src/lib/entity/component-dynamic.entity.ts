import {
  ANALYZE_FOR_ENTRY_COMPONENTS,
  ChangeDetectorRef,
  ComponentFactory,
  ComponentRef,
  DoCheck,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  Type
} from '@angular/core';
import {Subscription} from 'rxjs';

export type EventHandlerClosure = (event: any) => any;
export type InputComponent<T> = Partial<T>;
export type OutputComponent<T> = {
  [P in keyof T]?: EventHandlerClosure;
};

export interface IComponentDynamicEntity<T> {
  input?: InputComponent<T>;
  output?: OutputComponent<T>;
  type: Type<T>;
}

export type LifeCycleHook =
  'ngOnChanges'
  | 'ngOnInit'
  | 'ngDoCheck'
  | 'ngAfterContentInit'
  | 'ngAfterContentChecked'
  | 'ngAfterViewInit'
  | 'ngAfterViewChecked'
  | 'ngOnDestroy';

export function hasLifeCycleHook(context: any, name: LifeCycleHook): boolean {
  if (name in context) {
    return true;
  }

  const prototype = Object.getPrototypeOf(context);

  if (prototype) {
    return hasLifeCycleHook(prototype, name);
  }

  return false;
}

export function provideDynamicEntities(types: Type<any>[]) {
  return {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: types, multi: true};
}


export class ComponentDynamicEntity<T> implements IComponentDynamicEntity<T>, OnChanges, DoCheck {
  public input?: InputComponent<T>;
  public output?: OutputComponent<T>;
  public type!: Type<T>;
  public ref!: ComponentRef<T>;
  public factory!: ComponentFactory<T>;
  private changeDetectorRef!: ChangeDetectorRef;
  private attachedOutputs!: Subscription[];

  constructor(data: IComponentDynamicEntity<T>) {
    this.type = data.type;
    this.input = data.input;
    this.output = data.output;
  }

  get hasNgContent(): boolean {
    return this.factory.ngContentSelectors.length > 0;
  }

  public setFactory(factory: ComponentFactory<T>) {
    this.factory = factory;
  }

  public setComponentRef(ref: ComponentRef<T>) {
    this.ref = ref;
    this.changeDetectorRef = ref.injector.get<ChangeDetectorRef>(ChangeDetectorRef as Type<ChangeDetectorRef>, ref.changeDetectorRef);
    const instance: T & DoCheck = this.ref.instance as any;
    instance.ngDoCheck = markForCheckWrapper(instance.ngDoCheck, this.changeDetectorRef);
  }

  public attachInputs() {
    this.checkExistReference();
    const inputsObject: {
      [x: string]: Partial<T>[keyof T];
    } = {};
    this.factory.inputs.forEach(input => {
      if (this.input) {
        if (input.propName in this.input) {
          inputsObject[input.propName] = this.input[input.propName as keyof T];
        }
      }
    });
    Object.assign(this.ref.instance, inputsObject);
  }

  public attachOutputs() {
    this.checkExistReference();
    this.attachedOutputs = [];
    this.factory.outputs.forEach((output) => {
      if (this.output) {
        if (output.propName in this.output) {
          const fn: EventHandlerClosure = this.output[output.propName as keyof T]!;
          const event: T[keyof T] & EventEmitter<any> = this.ref.instance[output.propName as keyof T] as any;
          const subscription = event.subscribe(fn);
          this.attachedOutputs.push(subscription);
        }
      }
    });
    this.ref.onDestroy(() => {
      this.attachedOutputs.forEach(s => s.unsubscribe());
      this.attachedOutputs.splice(0);
    });
  }

  private checkExistReference(): void {
    if (!this.factory || !this.ref) {
      throw new Error('Cannot attach');
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (hasLifeCycleHook(this.ref.componentType.prototype, 'ngOnChanges')) {
      const instance: T & OnChanges = this.ref.instance as any;
      instance.ngOnChanges(changes);
    }
  }

  public ngDoCheck(): void {
    if (!hasLifeCycleHook(this.ref.componentType.prototype, 'ngDoCheck')) {
      const instance: T & DoCheck = this.ref.instance as any;
      instance.ngDoCheck();
    }
  }
}

export function markForCheckWrapper(delegateHook: (() => void) | null, cd: ChangeDetectorRef) {
  return function(this: InstanceType<any>) {
    if (delegateHook) {
      delegateHook.apply(this);
    }
    if (cd) {
      cd.markForCheck();
    }
  };
}
