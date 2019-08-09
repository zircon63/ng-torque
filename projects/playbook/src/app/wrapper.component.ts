import {Component, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'dynamic-wrapper',
  template: `
      <ng-template>
          <ng-content></ng-content>
      </ng-template>
  `,
  styles: []
})
export class WrapperComponent implements OnInit {
  @ViewChild(TemplateRef, {static: true, read: TemplateRef}) public content!: TemplateRef<any>;

  constructor(public viewRef: ViewContainerRef) {
  }

  ngOnInit() {
  }

}
