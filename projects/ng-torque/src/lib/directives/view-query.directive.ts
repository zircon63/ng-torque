import {Directive, Host, Type} from '@angular/core';
import {DynamicWrapperComponent} from '../dynamic-wrapper/dynamic-wrapper.component';


export function provideViewQuery<T>(type: Type<T>) {
  return {
    provide: ViewQueryDirective,
    useClass: type
  };
}

export function ViewQueryDef() {
  return Directive({
    selector: '[viewQuery]',
    exportAs: 'viewQuery'
  });
}

@ViewQueryDef()
export class ViewQueryDirective {
  constructor(@Host() public hostWrapper: DynamicWrapperComponent) {
  }
}
