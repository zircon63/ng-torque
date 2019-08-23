import {ContentChild, Directive, Host} from '@angular/core';
import {ComponentResolverDirective} from '../../../ng-torque/src/lib/directives/component-resolver.directive';
import {ViewQueryDirective} from '../../../ng-torque/src/lib/directives/view-query.directive';
import {DynamicWrapperComponent} from '../../../ng-torque/src/lib/dynamic-wrapper/dynamic-wrapper.component';

@Directive({
  selector: '[viewQuery]',
  exportAs: 'viewQuery'
})
export class Query1Directive extends ViewQueryDirective {
  @ContentChild('d', {static: true, read: ComponentResolverDirective}) public componentResolverDirective!: ComponentResolverDirective<any>;

  constructor(@Host() public wrapperComponent: DynamicWrapperComponent) {
    super(wrapperComponent);
  }

}
