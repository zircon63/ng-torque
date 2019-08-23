import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule, MatRadioModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {provideDynamicEntities} from '../../../ng-torque/src/lib/entity/component-dynamic.entity';
import {NgTorqueModule} from '../../../ng-torque/src/lib/ng-torque.module';
import {provideMapTypeTemplate, provideTemplateContainer} from '../../../ng-torque/src/lib/template-container/template-container.component';
import {AComponent} from './a.component';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BComponent} from './b.component';
import {CComponent} from './c.component';
import {ComposedViewDirective} from './composed-view.directive';
import {Query1Directive} from './query1.directive';
import {Query2Directive} from './query2.directive';
import {TemplateResolverPipe} from './template-resolver.pipe';
import {ViewDefDirective} from './view-def.directive';
import {ViewResolveDirective} from './view-resolve.directive';

@NgModule({
  declarations: [
    AppComponent,
    AComponent,
    BComponent,
    Query1Directive,
    Query2Directive,
    TemplateResolverPipe,
    CComponent,
    ViewDefDirective,
    ComposedViewDirective,
    ViewResolveDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgTorqueModule,
    MatCheckboxModule,
    MatRadioModule,
    ReactiveFormsModule
  ],
  providers: [
    provideDynamicEntities([CComponent]),
    provideTemplateContainer({
      key: 'container',
      value: CComponent
    }),
    provideMapTypeTemplate()
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
