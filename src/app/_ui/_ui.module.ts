import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

import {FormComponent} from './form/form.component';
import {FormAssemblyService} from './form/services/form.assembly.service';
import {CountryDataService} from './form/services/data/country.data.service';
import {FormSubmitService} from "./form/services/form.submit.service";
import {FormLabelComponent} from "./form/components/label/form.label.component";
import {FormSelectComponent} from "./form/components/select/form.select.component";
import {FormGenericInputComponent} from "./form/components/input.generic/form.generic.input.component";
import {FormAutocompleteInputComponent} from "./form/components/input.autocomplete/form.autocomplete.input.component";
import {FormXtraLinksComponent} from "./form/components/xtra.links/form.xtra.links.component";
import {FormXtraButtonsComponent} from "./form/components/xtra.buttons/form.xtra.buttons.component";
import {FormValidationMessagesComponent} from "./form/components/validation.messages.ts/form.validation.messages.component";
import {FormElementFocusService} from "./form/services/form.element.focus.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [ HttpClient ]
      }
    })
  ],
  declarations: [
    FormComponent,
    FormAutocompleteInputComponent,
    FormGenericInputComponent,
    FormLabelComponent,
    FormSelectComponent,
    FormXtraButtonsComponent,
    FormXtraLinksComponent,
    FormValidationMessagesComponent
  ],
  exports: [
    FormComponent,
    FormAutocompleteInputComponent,
    FormGenericInputComponent,
    FormLabelComponent,
    FormSelectComponent,
    FormXtraButtonsComponent,
    FormXtraLinksComponent,
    FormValidationMessagesComponent
  ],
  providers: [
    FormAssemblyService,
    FormElementFocusService,
    FormSubmitService,
    CountryDataService
  ]
})
export class UiModule {}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}