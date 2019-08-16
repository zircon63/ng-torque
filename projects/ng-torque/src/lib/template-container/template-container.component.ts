import {ANALYZE_FOR_ENTRY_COMPONENTS, InjectionToken, TemplateRef, Type} from '@angular/core';

export interface MapItem<K, V> {
  key: K;
  value: V;
}

export type MapType<T = any> = Map<string, Type<T>>;
export const TEMPLATE_CONTAINER = new InjectionToken<MapItem<string, any>>('TEMPLATE_CONTAINER');
export const MAP_TYPE_TEMPLATE = new InjectionToken<Map<string, Type<any>>>('MAP_TYPE_TEMPLATE');

export function provideTemplateContainer(value: MapItem<string, Type<any>>) {
  return [
    {
      provide: TEMPLATE_CONTAINER,
      useValue: value,
      multi: true
    },
    {
      provide: ANALYZE_FOR_ENTRY_COMPONENTS,
      useValue: value,
      multi: true
    }
  ];
}

export function provideMapTypeTemplate() {
  return {
    provide: MAP_TYPE_TEMPLATE,
    useFactory: mapFactory,
    deps: [TEMPLATE_CONTAINER]
  };
}

export function provideMapValue<K, V>(tokenMapItem: any, value: MapItem<K, V>) {
  return {
    provide: tokenMapItem,
    useValue: value,
    multi: true
  };
}

export function provideMap(tokenMapItem: any, tokenMap: any) {
  return {
    provide: tokenMap,
    useFactory: mapFactory,
    deps: [tokenMapItem]
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
