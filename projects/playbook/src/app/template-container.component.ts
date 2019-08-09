import {Component, ContentChild, TemplateRef, ViewChild} from '@angular/core';
import {ITemplateContainer} from '../../../ng-torque/src/lib/template-container/template-container.component';
import {BComponent} from './b.component';

@Component({
  selector: 'app-template-container',
  template: `
    <ng-content></ng-content>
    <ng-template #helloView let-title="title">
      <h2>Hi</h2>
      <b [title]="title"></b>
    </ng-template>
    <ng-template #text let-value="value">
      {{value}}
    </ng-template>
  `,
  styles: [],
  viewProviders: []
})
export class TemplateContainerComponent implements ITemplateContainer {
  @ViewChild('helloView', {static: true, read: TemplateRef}) private helloView!: TemplateRef<any>;
  @ViewChild('text', {static: true, read: TemplateRef}) private text!: TemplateRef<any>;
  @ViewChild(BComponent, {static: false}) BComponent: BComponent;

  constructor() {
  }

  public resolveTemplateRef(): { [p: string]: TemplateRef<any> } {
    return {
      helloView: this.helloView,
      text: this.text
    };
  }

}
