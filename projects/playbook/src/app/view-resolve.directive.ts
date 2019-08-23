import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[viewResolve]'
})
export class ViewResolveDirective {
  private context: any = { $implicit: null, init: null };
  @Input('viewResolve') public name!: string;

  @Input() set template(value: TemplateRef<any>) {
    this.viewRef.createEmbeddedView(value);
  }

  constructor(private viewRef: ViewContainerRef) {
  }

}
