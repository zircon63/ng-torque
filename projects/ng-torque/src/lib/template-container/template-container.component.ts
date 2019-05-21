import {ComponentFactory, InjectionToken, TemplateRef} from '@angular/core';

export const TEMPLATE_CONTAINER = new InjectionToken<ComponentFactory<ITemplateContainer>>('TEMPLATE_CONTAINER');

export interface ITemplateContainer {
  resolveTemplateRef(): {
    [name: string]: TemplateRef<any>
  };
}
