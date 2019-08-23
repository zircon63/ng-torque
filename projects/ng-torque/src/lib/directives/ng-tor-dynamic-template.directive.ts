import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  SimpleChanges,
  TemplateRef,
  Type,
  ViewContainerRef
} from '@angular/core';
import {TemplateContext, TemplateDynamicEntity} from '../entity/template-dynamic.entity';
import {ITemplateContainer, MAP_TYPE_TEMPLATE, MapType} from '../template-container/template-container.component';

export type TemplateContainerInstace<T> = T & ITemplateContainer;
export type TemplateContainerRef<T> = ComponentRef<TemplateContainerInstace<T>>;

@Directive({
  selector: '[ngTorDynamicTemplate]',
  exportAs: 'ngTorDynamicTemplate'
})
export class NgTorDynamicTemplateDirective<T extends string, I extends ITemplateContainer> implements OnChanges, OnDestroy {
  @Input('ngTorDynamicTemplate') public template!: TemplateRef<TemplateContext<T>> | string;
  @Input('ngTorDynamicTemplateContext') public context!: TemplateContext<T>;
  @Input('ngTorDynamicTemplateFrom') public container!: string;
  public entity!: TemplateDynamicEntity<T>;
  private templateContainerRef!: TemplateContainerRef<I> | undefined;

  constructor(protected viewRef: ViewContainerRef,
              private factoryResolver: ComponentFactoryResolver,
              @Optional() @Inject(MAP_TYPE_TEMPLATE) private mapType: MapType
  ) {
  }

  get templateContainer(): I | undefined {
    return this.templateContainerRef ? this.templateContainerRef.instance : undefined;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.viewRef.clear();
    if (TemplateDynamicEntity.isKey(this.template)) {
      const nameTemplate: string = this.template;
      if (this.mapType) {
        const type = this.mapType.get(this.container);
        if (type) {
          const factory = this.factoryResolver.resolveComponentFactory(type as Type<I>);
          this.templateContainerRef = this.viewRef.createComponent(factory);
          const templateMap = this.templateContainerRef.instance.resolveTemplateRef();
          if (nameTemplate in templateMap) {
            this.template = templateMap[nameTemplate];
          } else {
            throw new Error(`Cannot find template: ${nameTemplate} in container ${this.container}`);
          }
        } else {
          throw new Error('Cannot find container with selector: ' + this.container);
        }
      } else {
        throw new Error('Not provide by token TEMPLATE_CONTAINER !');
      }
    }
    this.entity = new TemplateDynamicEntity({
      type: this.template,
      context: this.context
    });
    const entity = this.entity as TemplateDynamicEntity<T>;
    entity.embeddedViewRef = this.viewRef.createEmbeddedView(this.entity.type as TemplateRef<TemplateContext<T>>, this.context, 0);
  }

  public ngOnDestroy(): void {
    if (this.templateContainerRef) {
      this.templateContainerRef.destroy();
    }
  }
}
