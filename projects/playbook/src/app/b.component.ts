import {Component, Input, OnInit} from '@angular/core';

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
  `]
})
export class BComponent implements OnInit {
  @Input() title: string;

  constructor() {
  }

  ngOnInit() {
  }

}
