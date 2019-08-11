import {ContentChild, Host} from '@angular/core';
import {NgTorDynamicTemplateDirective} from '../../../ng-torque/src/lib/directives/ng-tor-dynamic-template.directive';
import {ViewQueryDef, ViewQueryDirective} from '../../../ng-torque/src/lib/directives/view-query.directive';
import {DynamicWrapperComponent} from '../../../ng-torque/src/lib/dynamic-wrapper/dynamic-wrapper.component';

@ViewQueryDef()
export class Query2Directive extends ViewQueryDirective {
  @ContentChild(NgTorDynamicTemplateDirective, {
    static: false,
    read: NgTorDynamicTemplateDirective
  }) public dir!: NgTorDynamicTemplateDirective<any, any>;

  constructor(@Host() public wrapperComponent: DynamicWrapperComponent) {
    super(wrapperComponent);
  }

}
