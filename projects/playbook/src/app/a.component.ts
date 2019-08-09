import {AfterContentInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {provideContentQuery} from './content.directive';
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
  `],
  providers: [
    provideContentQuery(Query1Directive)
  ]
})
export class AComponent implements OnInit, AfterContentInit {
  @Input() title!: string;
  @Output() public push: EventEmitter<any> = new EventEmitter<any>();

  constructor(private query: Query1Directive) {
  }

  public ngOnInit() {

  }

  public ngAfterContentInit(): void {
    console.log(this.query);
  }

}
