import {EmbeddedViewRef, TemplateRef} from '@angular/core';

export type TemplateContext<T extends string> = Record<T, any>;

export interface ITemplateDynamicEntity<Props extends string> {
  context: TemplateContext<Props>;
  type: TemplateRef<TemplateContext<Props>> | string;
}

export class TemplateDynamicEntity<Props extends string> implements ITemplateDynamicEntity<Props> {

  constructor(data: ITemplateDynamicEntity<Props>) {
    this.type = data.type;
    this.context = data.context;
  }

  public static isKey<Props extends string>(type: TemplateRef<TemplateContext<Props>> | string): type is string {
    return typeof type === 'string';
  }

  public context: TemplateContext<Props>;
  public type: TemplateRef<TemplateContext<Props>> | string;
  public embeddedViewRef!: EmbeddedViewRef<TemplateContext<Props>>;
}
