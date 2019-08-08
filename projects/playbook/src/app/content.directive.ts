import {AfterContentInit, ContentChild, Directive} from '@angular/core';
import {NgTorDynamicComponentDirective} from 'projects/ng-torque/src/lib/directives/ng-tor-dynamic-component.directive';
import {BComponent} from './b.component';

@Directive({
  selector: '[content]'
})
export class ContentDirective implements AfterContentInit {
  @ContentChild(NgTorDynamicComponentDirective, {static: true}) public ngTorDynamicComponentDirective!: NgTorDynamicComponentDirective<BComponent>;

  public ngAfterContentInit(): void {
    console.log(this);
  }

}
