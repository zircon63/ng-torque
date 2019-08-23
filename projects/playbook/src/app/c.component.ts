import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ITemplateContainer} from '../../../ng-torque/src/lib/template-container/template-container.component';

@Component({
  selector: 'app-c',
  template: `
      <ng-template #greeting let-name="name">
          Hello {{name}}
      </ng-template>
  `,
  styles: []
})
export class CComponent implements OnInit, ITemplateContainer {
  @ViewChild('greeting', {static: true}) public greeting!: TemplateRef<any>;

  constructor() {
  }

  ngOnInit() {
  }

  resolveTemplateRef(): { [p: string]: TemplateRef<any> } {
    return {
      greeting: this.greeting
    };
  }

}
