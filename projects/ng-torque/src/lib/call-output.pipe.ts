import {ChangeDetectorRef, EmbeddedViewRef, Pipe, PipeTransform} from '@angular/core';
import {EventHandlerClosure} from './entity/component-dynamic.entity';


@Pipe({
  name: 'callOutput'
})
export class CallOutputPipe implements PipeTransform {
  private readonly context: EmbeddedViewRef<any>;

  constructor(private detectorRef: ChangeDetectorRef) {
    const {context} = this.detectorRef as EmbeddedViewRef<any>;
    this.context = context;
  }

  public transform(value: Function, args?: Array<any>): EventHandlerClosure {
    return (event: any) => {
      let ARGS = [];
      if (args) {
        ARGS = args.map((arg) => arg === '$event' ? event : arg);
      } else {
        ARGS.push(event);
      }
      return value.call(this.context, ...ARGS);
    };
  }

}
