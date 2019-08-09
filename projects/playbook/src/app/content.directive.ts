import {AfterContentInit, ContentChild, Directive, Host} from '@angular/core';
import {NgTorDynamicComponentDirective} from 'projects/ng-torque/src/lib/directives/ng-tor-dynamic-component.directive';
import {BComponent} from './b.component';
import {WrapperComponent} from './wrapper.component';

@Directive({
  selector: '[contentQuery]',
  exportAs: 'contentQuery'
})
export class ContentDirective implements AfterContentInit {
  @ContentChild(NgTorDynamicComponentDirective, {static: true}) public ngTorDynamicComponentDirective!: NgTorDynamicComponentDirective<BComponent>;

  constructor(@Host() public wrapperComponent: WrapperComponent) {

  }

  public ngAfterContentInit(): void {
    console.log(this);
  }

}
