import {ContentChild, Directive, Host} from '@angular/core';
import {NgTorDynamicTemplateDirective} from '../../../ng-torque/src/lib/directives/ng-tor-dynamic-template.directive';
import {WrapperComponent} from './wrapper.component';

@Directive({
  selector: '[viewQuery]',
  exportAs: 'viewQuery'
})
export class Query2Directive {
  @ContentChild(NgTorDynamicTemplateDirective, {static: false, read: NgTorDynamicTemplateDirective}) public dir!: NgTorDynamicTemplateDirective;

  constructor(@Host() public wrapperComponent: WrapperComponent) {

  }

}
