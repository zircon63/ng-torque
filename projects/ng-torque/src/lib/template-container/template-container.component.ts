import {InjectionToken, TemplateRef, Type} from '@angular/core';

export interface MapItem<K, V> {
  key: K;
  value: V;
}

export type MapType<T = any> = Map<string, Type<T>>;
export const TEMPLATE_CONTAINER = new InjectionToken<MapItem<string, any>>('TEMPLATE_CONTAINER');
export const MAP_TYPE_TEMPLATE = new InjectionToken<Map<string, Type<any>>>('MAP_TYPE_TEMPLATE');

export function provideTemplateContainer(value: MapItem<string, Type<any>>) {
  return {
    provide: TEMPLATE_CONTAINER,
    useValue: value,
    multi: true
  };
}

export function provideMapTypeTemplate() {
  return {
    provide: MAP_TYPE_TEMPLATE,
    useFactory: mapFactory,
    deps: [TEMPLATE_CONTAINER]
  };
}

export function mapFactory<K, V>(items: MapItem<K, V>[]) {
  return items.reduce((map, item) => map.set(item.key, item.value), new Map());
}

export interface ITemplateContainer {
  resolveTemplateRef(): {
    [name: string]: TemplateRef<any>
  };
}
