import {NgModule} from '@angular/core';
import {MatCheckbox, MatCheckboxModule, MatRadioButton, MatRadioModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {NgTorqueModule} from '../../../ng-torque/src/lib/ng-torque.module';
import {provideMapTypeTemplate, provideTemplateContainer} from '../../../ng-torque/src/lib/template-container/template-container.component';
import {AComponent} from './a.component';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BComponent} from './b.component';
import {ContentResolverDirective} from './content-resolver.directive';
import {ContentDirective} from './content.directive';
import {TemplateContainerComponent} from './template-container.component';
import {WrapperComponent} from './wrapper.component';
import { TemplateResolverPipe } from './template-resolver.pipe';
import { CComponent } from './c.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentResolverDirective,
    AComponent,
    BComponent,
    WrapperComponent,
    ContentDirective,
    TemplateContainerComponent,
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
  providers: [
    provideTemplateContainer({
      name: 'test-container',
      type: TemplateContainerComponent
    }),
    provideMapTypeTemplate()
  ],
  entryComponents: [AComponent,
    BComponent,
    WrapperComponent,
    MatRadioButton,
    MatCheckbox,
    TemplateContainerComponent,
    CComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
