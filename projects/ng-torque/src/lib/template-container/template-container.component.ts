import {InjectionToken, TemplateRef, Type} from '@angular/core';


export interface MapTypeItem<T> {
  type: T;
  name: string;
}

export type MapType<T = any> = Map<string, Type<T>>;
export const TEMPLATE_CONTAINER = new InjectionToken<MapTypeItem<any>>('TEMPLATE_CONTAINER');
export const MAP_TYPE_TEMPLATE = new InjectionToken<Map<string, Type<any>>>('MAP_TYPE_TEMPLATE');

export function provideTemplateContainer(values: MapTypeItem<any>[]) {
  const templateProviders = values.map(value => {
    return {
      provide: TEMPLATE_CONTAINER,
      useValue: value,
      multi: true
    };
  });
  const providers = [
    ...templateProviders,
    {
      provide: MAP_TYPE_TEMPLATE,
      useFactory: mapTypeFactory,
      deps: [TEMPLATE_CONTAINER]
    }
  ];
  return providers;
}

export function mapTypeFactory(containers: MapTypeItem<any>[]) {
  return containers.reduce((config, item) => config.set(item.name, item.type), new Map());
}

export interface ITemplateContainer {
  resolveTemplateRef(): {
    [name: string]: TemplateRef<any>
  };
}
