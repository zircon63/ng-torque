# NG-TORQUE
![NG-TORQUE](https://github.com/zircon63/ng-torque/raw/master/assets/logo.png)

- [x] AOT support
- [x] IVY-render support
- [x] Full lifecycle components
- [x] Dynamic content projection
- [x] Dynamic `FormControl` binding

##Installation
```bash
$ npm install ng-torque --save
```

##Usage

###Dynamic Components
 ##Before Usage
 1. Import NgTorqueModule
 2. Declare dynamic entities by factory function provideDynamicEntities
 ```ts
@NgModule({
  declarations: [
    AppComponent,
    AComponent
  ],
  imports: [
    BrowserModule,
    NgTorqueModule,
  ],
  providers: [
    provideDynamicEntities([AComponent])
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
 ```
####Simple
Then in your component's template include <dynamic-wrapper componentResolver> where you want to render component and bind from your component class type of component to render:
```ts
@Component({
  selector: 'app-test',
  template: `
      <dynamic-wrapper componentResolver
                       [type]="dynamicEntity"
      ></dynamic-wrapper>
  `,
  styles: []
})
export class TestComponent {
  public dynamicEntity: Type<AComponent> = AComponent;
}
```
####Binding Input/Output
You can also pass input and output to your dynamic component 

***AComponent***
```ts
@Component({
  selector: 'a',
  template: `
      <p>
          a works!
          {{title}}: {{counter}}
      </p>
      <button (click)="increase()">Submit Event</button>
  `
})
export class AComponent {
  @Input() public title!: string;
  @Input() public counter!: number;
  @Output() public count: EventEmitter<number> = new EventEmitter<number>();

  public increase() {
    this.count.emit(this.counter += 1);
  }
}
```

***TestComponent***
Create variable dynamicEntity: ComponentDynamicEntity with type: `AComponent`,
input with same fields in `AComponent`, and use `callOutput` Pipe for binding output handler `increseCounter`.

Arg `$event` in pipe use for map `EventEmmiter` value, i.e this equal:
```ts
<a (count)="increaseCounter($event, parentValue)"></a>
```

```ts
@Component({
  selector: 'app-test',
  template: `
      <dynamic-wrapper componentResolver
                       [type]="dynamicEntity.type"
                       [input]="dynamicEntity.input"
                       [output]="{
                            count: increaseCounter | callOutput: ['$event', parentValue]
                       }"
      ></dynamic-wrapper>
  `,
  styles: []
})
export class TestComponent {
  public parentValue = 'HelloWorld';
  public dynamicEntity: ComponentDynamicEntity<AComponent> = new ComponentDynamicEntity<AComponent>(
    {
      type: AComponent,
      input: {
        title: 'Dynamic Title',
        counter: 0
      }
    }
  );

  public increaseCounter(value: number, parentValue: string) {
    console.log(value, parentValue);
  }

}
```
####Dynamic Content
You can also use content projection for your dynamic component.

If you need resolve `@ContentChild/ @ContentChildren` in your dynamic component - use `viewQuery` directive.
***ViewQueryDirective***

If you use the component not only for dynamics, you must use `@Optional()` for inject ViewQuery.
```ts
@Directive({
  selector: '[viewQuery]',
  exportAs: 'viewQuery'
})
export class Query1Directive extends ViewQueryDirective {
  @ContentChild(CComponent, {static: true}) public cComponent!: CComponent;

  constructor(@Optional() @Host() public wrapperComponent: DynamicWrapperComponent) {
    super(wrapperComponent);
  }

}
```
***CComponent***
```ts
@Component({
  selector: 'app-c',
  template: `
      <p>
          CComponent : {{title}}
      </p>
  `,
  styles: []
})
export class CComponent {
  @Input() public title!: string;
}
```
***AComponent***

Use function `provideViewQuery` for provide yours ViewQuery implementation. 
If you use the component not only for dynamics, you must use `@Optional()` for inject ViewQuery.
```ts
@Component({
  selector: 'a',
  template: `
      <p>
          a works!
      </p>
      <ng-content></ng-content>
  `,
  providers: [
    provideViewQuery(Query1Directive)
  ]
})
export class AComponent implements AfterContentInit {
  constructor(@Optional() private contentQuery: Query1Directive) {
  }

  public ngAfterContentInit(): void {
    // Set title in CComponent
    this.contentQuery.cComponent.title = 'Hello from AComponent';
  }
}
```

It's example equal native content-projection:
```ts
<a>
    <app-c></app-c>
</a>
```

####Dynamic Control
You can use `dynamicControl` directive for binding `FormControl` on your dynamic component which implements `ControlValueAccessor`.
***BComponent***
```ts

@Component({
  selector: 'b',
  template: `
      <p>B-COMPONENT: {{title}}</p>
      <input type="text" [formControl]="control"/>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => BComponent),
      multi: true
    },
  ]
})
export class BComponent implements OnInit, ControlValueAccessor, Validator {
  @Input() title!: string;
  public control = new FormControl();

  private validateFn = () => {
  };
  private change = (value: any) => {
  };

  ngOnInit() {
    this.control.valueChanges.subscribe(value => {
      this.change(value);
    });
  }

  registerOnChange(fn: any): void {
    this.change = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {

  }

  writeValue(obj: any): void {
    this.control.setValue(obj, {emitEvent: false});
  }

  registerOnValidatorChange(fn: () => void): void {
    this.validateFn = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    console.log(control.value);
    return Validators.required(control);
  }

}
```
***TestComponent***
```ts
<dynamic-wrapper
  dynamicControl
  [control]="control"
  componentResolver
  [type]="entityB.type"
></dynamic-wrapper>
```

###Dynamic Templates

####Template Containers

Template container represents `TemplateRef` registry for dynamic resolving in your components.

Before usage need provide containers and map by functions:
```ts
@NgModule({
  declarations: [
    AppComponent,
    AComponent
  ],
  imports: [
    BrowserModule,
    NgTorqueModule,
  ],
  providers: [
    provideTemplateContainer({
      key: 'container',
      value: ContainerComponent
    }),
    provideMapTypeTemplate()
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
```
***ContainerComponent***
```ts
@Component({
  selector: 'container',
  template: `
      <ng-template #greeting let-name="name">
          Hello {{name}}
      </ng-template>
  `
})
export class ContainerComponent implements ITemplateContainer {
  @ViewChild('greeting', {static: true}) public greeting!: TemplateRef<any>;

  resolveTemplateRef(): { [p: string]: TemplateRef<any> } {
    return {
      greeting: this.greeting
    };
  }

}
```
***TestComponent***
```ts
@Component({
  selector: 'app-test',
  template: `
      <ng-container *ngTorDynamicTemplate="'greeting' context {name: 'Zircon63'} from 'container'">
      </ng-container>
  `,
  styles: []
})
export class TestComponent {
}
```


####Utils

***mapFactory***

Factory function for provide anything MAP-structure values.

For example provide map of dynamic components:
```ts
@NgModule({
  declarations: [
    AppComponent,
    AComponent,
    BComponent
  ],
  imports: [
    BrowserModule,
    NgTorqueModule
  ],
  providers: [
    provideMapValue('dynamic-component', {
      value: AComponent,
      key: 'a-component'
    }),
    provideMapValue('dynamic-component', {
      value: BComponent,
      key: 'b-component'
    }),
    provideMap('dynamic-component', 'map-dynamic-component')
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Inject('map-dynamic-component') map: Map<string, Type<any>>) {
    console.log(map);
    /*
    * a-component => class AComponent
    * b-component => class BComponent
    * */
  }
}
```
