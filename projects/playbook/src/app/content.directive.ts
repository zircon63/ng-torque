import {AfterContentInit, ContentChild, Directive, Host, Type} from '@angular/core';
import {NgTorDynamicComponentDirective} from 'projects/ng-torque/src/lib/directives/ng-tor-dynamic-component.directive';
import {BComponent} from './b.component';
import {WrapperComponent} from './wrapper.component';

abstract class ViewQueryDirective<T> {
  protected constructor(@Host() public wrapperComponent: WrapperComponent) {
  }

  public abstract resolver(): { [p: string]: any };
}

export function provideContentQuery<T>(type: Type<T>) {
  return {
    provide: ContentDirective,
    useClass: type
  };
}

@Directive({
  selector: '[viewQuery]',
  exportAs: 'viewQuery'
})
export class ContentDirective extends ViewQueryDirective<any> implements AfterContentInit {
  @ContentChild(NgTorDynamicComponentDirective, {static: true}) public ngTorDynamicComponentDirective!: NgTorDynamicComponentDirective<BComponent>;

  constructor(@Host() public wrapperComponent: WrapperComponent) {
    super(wrapperComponent);
  }

  public resolver() {
    return {
      ngTor: this.ngTorDynamicComponentDirective
    };
  }

}
