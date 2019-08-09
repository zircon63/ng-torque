import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {provideContentQuery} from './content.directive';
import {Query2Directive} from './query2.directive';

@Component({
  selector: 'b',
  template: `
      <p>B-COMPONENT: {{title}}</p>
      <ng-content></ng-content>
  `,
  styles: [`
      p {
          color: darkgreen;
      }
  `],
  providers: [
    provideContentQuery(Query2Directive)
  ]
})
export class BComponent implements OnInit, AfterContentInit {
  @Input() title!: string;

  constructor(private query: Query2Directive) {
  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    console.log(this);
  }

}
