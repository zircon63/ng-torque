import {NgModule} from '@angular/core';
import {CallOutputPipe} from './call-output.pipe';
import {NgTorDynamicComponentDirective} from './directives/ng-tor-dynamic-component.directive';
import {NgTorDynamicControlDirective} from './directives/ng-tor-dynamic-control.directive';
import {NgTorDynamicTemplateDirective} from './directives/ng-tor-dynamic-template.directive';


const DIRECTIVES = [
  NgTorDynamicComponentDirective,
  NgTorDynamicTemplateDirective,
  NgTorDynamicControlDirective
];
const PIPES = [
  CallOutputPipe
];

@NgModule({
  declarations: [...DIRECTIVES, ...PIPES],
  imports: [],
  exports: [...DIRECTIVES, ...PIPES]
})
export class NgTorqueModule {
}

export {NgTorDynamicComponentDirective} from './directives/ng-tor-dynamic-component.directive';
export {NgTorDynamicControlDirective} from './directives/ng-tor-dynamic-control.directive';
export {NgTorDynamicTemplateDirective} from './directives/ng-tor-dynamic-template.directive';
export {CallOutputPipe} from './call-output.pipe';
