import {AfterContentInit, ContentChild, Directive} from '@angular/core';
import {NgTorDynamicTemplateDirective} from '../../../ng-torque/src/lib/directives/ng-tor-dynamic-template.directive';

@Directive({
  selector: '[contentResolver]'
})
export class ContentResolverDirective implements AfterContentInit {
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
