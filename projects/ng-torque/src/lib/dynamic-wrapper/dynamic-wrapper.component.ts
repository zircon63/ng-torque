import {Component, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'dynamic-wrapper',
  template: `
      <ng-template>
          <ng-content></ng-content>
      </ng-template>
  `,
  styles: []
})
export class DynamicWrapperComponent {
  @ViewChild(TemplateRef, {static: true, read: TemplateRef}) public content!: TemplateRef<any>;

  constructor(public viewRef: ViewContainerRef) {
  }

}
