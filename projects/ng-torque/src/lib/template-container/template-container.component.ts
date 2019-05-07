import {ComponentFactoryResolver, InjectionToken, TemplateRef, Type} from '@angular/core';

export const TEMPLATE_CONTAINER = new InjectionToken('TEMPLATE_CONTAINER');

export function provideTemplateContainer<T>(ctor: Type<T>) {
  return {
    provide: TEMPLATE_CONTAINER,
    useFactory: (factory: ComponentFactoryResolver) => factory.resolveComponentFactory(ctor),
    deps: [ComponentFactoryResolver],
    multi: true
  };
}

export interface ITemplateContainer {
  resolveTemplateRef(): {
    [name: string]: TemplateRef<any>
  };
}
