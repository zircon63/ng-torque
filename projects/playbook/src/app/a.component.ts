import {AfterContentInit, Component, OnInit} from '@angular/core';
import {DynamicDirective} from './dynamic.directive';

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
  constructor(private dasd: DynamicDirective) {
  }

  ngOnInit() {

  }

  ngAfterContentInit(): void {
    this.dasd.ContentDirective.NgTorDynamicComponentDirective.entity.ref.instance.title = 'Hello world';
  }

}
