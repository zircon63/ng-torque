import {AfterContentInit, Component, OnInit} from '@angular/core';
import {ContentResolverDirective} from './content-resolver.directive';

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
  constructor(private dasd: ContentResolverDirective) {
  }

  public ngOnInit() {

  }

  public ngAfterContentInit(): void {
    this.dasd.contentDirective.ngTorDynamicComponentDirective.entity.ref.instance.title = 'Hello world';
  }

}
