import {AfterContentInit, ContentChildren, Directive, QueryList, TemplateRef} from '@angular/core';
import {ViewDefDirective} from './view-def.directive';
import {ViewResolveDirective} from './view-resolve.directive';

@Directive({
  selector: '[composedView]'
})
export class ComposedViewDirective implements AfterContentInit {
  @ContentChildren(ViewDefDirective) public views!: QueryList<ViewDefDirective>;
  @ContentChildren(ViewResolveDirective) public viewResolves!: QueryList<ViewResolveDirective>;
  private mapViews!: Map<string, TemplateRef<any>>;
  private resolveViews!: Map<string, ViewResolveDirective>;
  private _context: any;
  constructor() {
  }

  public ngAfterContentInit(): void {
    this.mapViews = this.views.reduce((map, view) => map.set(view.name, view.templateRef), new Map());
    this.resolveViews = this.viewResolves.reduce((map, view) => map.set(view.name, view), new Map());
    Array.from(this.mapViews.entries()).forEach(([name, value]) => {
      const resolveView = this.resolveViews.get(name);
      if (resolveView) {
        resolveView.template = value;
      }
    });
  }

}
