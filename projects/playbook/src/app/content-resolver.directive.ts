import {AfterContentInit, ContentChild, Directive} from '@angular/core';
import {NgTorDynamicTemplateDirective} from '../../../ng-torque/src/lib/directives/ng-tor-dynamic-template.directive';
import {ContentDirective} from './content.directive';
import {WrapperComponent} from './wrapper.component';

@Directive({
  selector: '[contentResolver]'
})
export class ContentResolverDirective implements AfterContentInit {
  @ContentChild('wrapper', {static: true}) public wrapperComponent!: WrapperComponent;
  @ContentChild(ContentDirective, {static: true, read: ContentDirective}) public contentDirective!: ContentDirective;
  @ContentChild(NgTorDynamicTemplateDirective, {
    static: true,
    read: NgTorDynamicTemplateDirective
  }) public templateDirective!: NgTorDynamicTemplateDirective<any, any>;

  constructor() {
  }

  ngAfterContentInit(): void {
    console.log(this);
  }

}
