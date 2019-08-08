import {AfterContentInit, ContentChild, Directive, Host} from '@angular/core';
import {BComponent} from './b.component';
import {NgTorDynamicComponentDirective} from 'projects/ng-torque/src/lib/directives/ng-tor-dynamic-component.directive';
import {WrapperComponent} from './wrapper.component';

@Directive({
  selector: '[content]'
})
export class ContentDirective implements AfterContentInit {
  @ContentChild(NgTorDynamicComponentDirective, {static: true}) public NgTorDynamicComponentDirective: NgTorDynamicComponentDirective<BComponent>;

  constructor(@Host() component: WrapperComponent) {
    console.log(component);
  }

  ngAfterContentInit(): void {
    console.log(this)
  }

}
