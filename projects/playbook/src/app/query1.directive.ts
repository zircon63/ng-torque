import {ContentChild, Directive, Host} from '@angular/core';
import {ContentResolverDirective} from './content-resolver.directive';
import {WrapperComponent} from './wrapper.component';

@Directive({
  selector: '[viewQuery]',
  exportAs: 'viewQuery'
})
export class Query1Directive {
  @ContentChild('d', {static: true, read: ContentResolverDirective}) public ContentResolverDirective!: ContentResolverDirective;

  constructor(@Host() public wrapperComponent: WrapperComponent) {

  }

}
