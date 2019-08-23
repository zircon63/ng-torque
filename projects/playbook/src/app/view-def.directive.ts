import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[viewDef]'
})
export class ViewDefDirective {
  @Input('viewDef') public name!: string;

  constructor(public templateRef: TemplateRef<any>) {
  }

}
