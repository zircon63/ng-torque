import {AfterContentInit, Component, OnInit} from '@angular/core';
import {TemplateContainerComponent} from './template-container.component';

@Component({
  selector: 'a',
  template: `
    <p>
      a works!
    </p>
    <ng-content></ng-content>
  `,
  styles: [`
    p {
      color: firebrick;
    }
  `]
})
export class AComponent implements OnInit, AfterContentInit {
  constructor(public testContainer: TemplateContainerComponent) {
  }

  public ngOnInit() {

  }

  public ngAfterContentInit(): void {
    console.log(this);
  }

}
