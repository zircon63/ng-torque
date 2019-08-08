import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'wrapper',
  template: `
      <ng-template>
          <ng-content></ng-content>
      </ng-template>
  `,
  styles: []
})
export class WrapperComponent implements OnInit {
  @ViewChild(TemplateRef, {static: true, read: TemplateRef}) public content!: TemplateRef<any>;

  constructor() {
  }

  ngOnInit() {
  }

}
