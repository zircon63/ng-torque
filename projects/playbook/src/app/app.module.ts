import {NgModule} from '@angular/core';
import {MatCheckbox, MatCheckboxModule, MatRadioButton, MatRadioModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {NgTorqueModule} from '../../../ng-torque/src/lib/ng-torque.module';
import {AComponent} from './a.component';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BComponent} from './b.component';
import {DynamicDirective} from './dynamic.directive';
import {WrapperComponent} from './wrapper.component';
import { ContentDirective } from './content.directive';

@NgModule({
  declarations: [
    AppComponent,
    DynamicDirective,
    AComponent,
    BComponent,
    WrapperComponent,
    ContentDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgTorqueModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  providers: [],
  entryComponents: [AComponent,
    BComponent,
    WrapperComponent,
    MatRadioButton,
    MatCheckbox
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
