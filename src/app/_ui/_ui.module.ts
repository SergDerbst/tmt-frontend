import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { } from '@immortaldev/country-list';

import { FormComponent } from './form/form.component';
import { FormService } from './form/elements/form.service';
import { CountrySelectComponent } from './form/elements/country.select/country.select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
    CountrySelectComponent
  ],
  exports: [
    FormComponent
  ],
  providers: [
    FormService
  ]
})
export class UiModule {}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
