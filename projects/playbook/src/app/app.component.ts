import {Component} from '@angular/core';
import {ComponentDynamicEntity} from '../../../ng-torque/src/lib/entity/component-dynamic.entity';
import {AComponent} from './a.component';
import {BComponent} from './b.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'playbook';
  public entities: ComponentDynamicEntity<any>[] = [];
  public entityA = new ComponentDynamicEntity({
    type: AComponent
  });
  public entityB = new ComponentDynamicEntity({
    type: BComponent
  });

  constructor() {
    this.entities.push(new ComponentDynamicEntity({
      type: AComponent
    }));
  }
}
