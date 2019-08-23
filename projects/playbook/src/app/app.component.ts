import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
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
  public control = new FormControl();
  public entities: ComponentDynamicEntity<any>[] = [];
  public entityA = new ComponentDynamicEntity({
    type: AComponent
  });
  public entityB = new ComponentDynamicEntity({
    type: BComponent
  });
  public array = new Array(3).fill(0).map((val, index) => index);

  constructor() {
    this.entities.push(new ComponentDynamicEntity({
      type: AComponent
    }));
    this.control.disable();
  }

  public pushed(index: number) {
    console.log(`Remove index:${index}`);
    this.array.splice(index, 1);
  }
}
