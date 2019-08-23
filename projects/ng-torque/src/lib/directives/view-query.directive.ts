import {Directive, Host, Type} from '@angular/core';
import {DynamicWrapperComponent} from '../dynamic-wrapper/dynamic-wrapper.component';


export function provideViewQuery<T>(type: Type<T>) {
  return {
    provide: ViewQueryDirective,
    useClass: type
  };
}

@Directive({
  selector: '[viewQuery]',
  exportAs: 'viewQuery'
})
export class ViewQueryDirective {
  constructor(@Host() public hostWrapper: DynamicWrapperComponent) {
  }
}
