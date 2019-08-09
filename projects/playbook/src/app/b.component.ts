import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
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
    provideContentQuery(Query2Directive),
    {
      provide: NG_VALUE_ACCESSOR,
      useClass: BComponent,
      multi: true
    }
  ]
})
export class BComponent implements OnInit, AfterContentInit, ControlValueAccessor {
  @Input() title!: string;
  change = () => {
  };

  constructor(private query: Query2Directive) {
  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    console.log(this);
  }

  registerOnChange(fn: any): void {
    this.change = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    console.log(obj);
  }

}
