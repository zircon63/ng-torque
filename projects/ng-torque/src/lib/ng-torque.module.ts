import {NgModule} from '@angular/core';
import {CallOutputPipe} from './call-output.pipe';
import {ComponentResolverDirective} from './directives/component-resolver.directive';
import {DynamicControlDirective} from './directives/dynamic-control.directive';
import {NgTorDynamicComponentDirective} from './directives/ng-tor-dynamic-component.directive';
import {NgTorDynamicControlDirective} from './directives/ng-tor-dynamic-control.directive';
import {NgTorDynamicTemplateDirective} from './directives/ng-tor-dynamic-template.directive';
import {ViewQueryDirective} from './directives/view-query.directive';
import {DynamicWrapperComponent} from './dynamic-wrapper/dynamic-wrapper.component';


const DIRECTIVES = [
  ComponentResolverDirective,
  ViewQueryDirective,
  DynamicControlDirective,
  NgTorDynamicComponentDirective,
  NgTorDynamicTemplateDirective,
  NgTorDynamicControlDirective
];
const PIPES = [
  CallOutputPipe
];

const COMPONENTS = [
  DynamicWrapperComponent
];

@NgModule({
  declarations: [...DIRECTIVES, ...PIPES, ...COMPONENTS],
  exports: [...DIRECTIVES, ...PIPES, ...COMPONENTS]
})
export class NgTorqueModule {
}

export {NgTorDynamicComponentDirective} from './directives/ng-tor-dynamic-component.directive';
export {NgTorDynamicControlDirective} from './directives/ng-tor-dynamic-control.directive';
export {NgTorDynamicTemplateDirective} from './directives/ng-tor-dynamic-template.directive';
export {CallOutputPipe} from './call-output.pipe';
