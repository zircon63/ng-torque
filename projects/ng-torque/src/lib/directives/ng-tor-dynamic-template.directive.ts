import {
  ComponentFactory,
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
import {TemplateContext, TemplateDynamicEntity} from 'ng-torque/entity/template-dynamic.entity';
import {ITemplateContainer, TEMPLATE_CONTAINER} from 'ng-torque/template-container/template-container.component';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[ngTorDynamicTemplate]',
  exportAs: 'ngTorDynamicTemplate'
})
export class NgTorDynamicTemplateDirective<T extends string> implements OnChanges, OnDestroy {
  @Input('ngTorDynamicTemplate') public template!: TemplateRef<TemplateContext<T>> | string;
  @Input('ngTorDynamicTemplateContext') public context!: TemplateContext<T>;
  @Input('ngTorDynamicTemplateContainer') public container!: string;
  public entity!: TemplateDynamicEntity<T>;
  private initContainer$!: Subscription;

  constructor(protected viewRef: ViewContainerRef,
              @Optional() @Inject(TEMPLATE_CONTAINER) private factories: ComponentFactory<ITemplateContainer>[]
  ) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.viewRef.clear();
    if (TemplateDynamicEntity.isKey(this.template)) {
      const nameTemplate: string = this.template;
      if (this.factories) {
        const factory = this.factories.find(f => f.selector === this.container);
        if (factory) {
          const componentRef = this.viewRef.createComponent(factory);
          this.viewRef.remove(this.viewRef.indexOf(componentRef.hostView));
          const templateMap = componentRef.instance.resolveTemplateRef();
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
    if (this.initContainer$) {
      this.initContainer$.unsubscribe();
    }
  }
}
