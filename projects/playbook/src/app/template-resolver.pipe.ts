import {Pipe, PipeTransform, TemplateRef} from '@angular/core';
import {ITemplateContainer} from '../../../ng-torque/src/lib/template-container/template-container.component';

@Pipe({
  name: 'templateResolver'
})
export class TemplateResolverPipe implements PipeTransform {
  constructor() {

  }

  public transform(name: string, container: ITemplateContainer): TemplateRef<any> {
    return container.resolveTemplateRef()[name];
  }

}
