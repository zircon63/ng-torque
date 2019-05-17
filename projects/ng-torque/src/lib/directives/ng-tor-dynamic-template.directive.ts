import {
  ComponentFactory,
  ComponentRef,
  Directive,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {TemplateContext, TemplateDynamicEntity} from '../entity/template-dynamic.entity';
import {ITemplateContainer, TEMPLATE_CONTAINER} from '../template-container/template-container.component';


@Directive({
  selector: '[ngTorDynamicTemplate]',
  exportAs: 'ngTorDynamicTemplate'
})
export class NgTorDynamicTemplateDirective<T extends string> implements OnChanges, OnDestroy {
  @Input('ngTorDynamicTemplate') public template!: TemplateRef<TemplateContext<T>> | string;
  @Input('ngTorDynamicTemplateContext') public context!: TemplateContext<T>;
  @Input('ngTorDynamicTemplateContainer') public container!: string;
  public entity!: TemplateDynamicEntity<T>;
  private templateContainerRef!: ComponentRef<ITemplateContainer> | undefined;

  constructor(protected viewRef: ViewContainerRef,
              @Optional() @Inject(TEMPLATE_CONTAINER) private factories: ComponentFactory<ITemplateContainer>[]
  ) {
  }

  get templateContainer(): ITemplateContainer | undefined {
    return this.templateContainerRef ? this.templateContainerRef.instance : undefined;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.viewRef.clear();
    if (TemplateDynamicEntity.isKey(this.template)) {
      const nameTemplate: string = this.template;
      if (this.factories) {
        const factory = this.factories.find(f => f.selector === this.container);
        if (factory) {
          this.templateContainerRef = this.viewRef.createComponent(factory);
          const templateMap = this.templateContainerRef.instance.resolveTemplateRef();
          this.template = templateMap[nameTemplate];
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
