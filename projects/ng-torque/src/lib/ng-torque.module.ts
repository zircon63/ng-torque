import {NgModule} from '@angular/core';
import {CallOutputPipe} from 'ng-torque/call-output.pipe';
import {NgTorDynamicControlDirective} from 'ng-torque/directives/ng-tor-dynamic-control.directive';
import {NgTorDynamicComponentDirective} from './directives/ng-tor-dynamic-component.directive';
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
