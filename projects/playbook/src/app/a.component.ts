import {AfterContentInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {provideViewQuery} from '../../../ng-torque/src/lib/directives/view-query.directive';
import {Query1Directive} from './query1.directive';

@Component({
  selector: 'a',
  template: `
      <p>
          a works!
          {{title}}
      </p>
      <button (click)="push.emit($event)">Push</button>
      <ng-content></ng-content>
  `,
  styles: [`
      p {
          color: firebrick;
      }
  `]
})
export class AComponent implements OnInit, AfterContentInit {
  @Input() title!: string;
  @Output() public push: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  public ngOnInit() {

  }

  public ngAfterContentInit(): void {
  }

}
