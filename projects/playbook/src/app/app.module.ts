import {NgModule} from '@angular/core';
import {MatCheckbox, MatCheckboxModule, MatRadioButton, MatRadioModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {NgTorqueModule} from '../../../ng-torque/src/lib/ng-torque.module';
import {AComponent} from './a.component';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BComponent} from './b.component';
import {CComponent} from './c.component';
import {ContentResolverDirective} from './content-resolver.directive';
import {ContentDirective} from './content.directive';
import {Query1Directive} from './query1.directive';
import {Query2Directive} from './query2.directive';
import {TemplateResolverPipe} from './template-resolver.pipe';
import {WrapperComponent} from './wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentResolverDirective,
    AComponent,
    BComponent,
    WrapperComponent,
    ContentDirective,
    Query1Directive,
    Query2Directive,
    TemplateResolverPipe,
    CComponent,
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
    MatCheckbox,
    CComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
