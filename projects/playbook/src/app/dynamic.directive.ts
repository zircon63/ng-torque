import {AfterContentInit, ContentChild, Directive} from '@angular/core';
import {ContentDirective} from './content.directive';
import {WrapperComponent} from './wrapper.component';

@Directive({
  selector: '[contentResolver]'
})
export class DynamicDirective implements AfterContentInit {
  @ContentChild('wrapper', {static: true, read: WrapperComponent}) WrapperComponent: WrapperComponent;
  @ContentChild(ContentDirective, {static: true, read: ContentDirective}) ContentDirective: ContentDirective;

  constructor() {
  }

  ngAfterContentInit(): void {
    console.log(this);
  }

}
