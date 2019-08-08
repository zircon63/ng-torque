import {Component, TemplateRef, ViewChild} from '@angular/core';
import {ITemplateContainer} from '../../../ng-torque/src/lib/template-container/template-container.component';

@Component({
  selector: 'app-template-container',
  template: `
      <ng-template #helloView let-title="title">
          <h2>Hi</h2>
          <b [title]="title"></b>
      </ng-template>
  `,
  styles: []
})
export class TemplateContainerComponent implements ITemplateContainer {
  @ViewChild('helloView', {static: true, read: TemplateRef}) private helloView!: TemplateRef<any>;

  constructor() {
  }

  public resolveTemplateRef(): { [p: string]: TemplateRef<any> } {
    return {
      helloView: this.helloView
    };
  }

}
