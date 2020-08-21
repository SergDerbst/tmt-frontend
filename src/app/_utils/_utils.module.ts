import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormControlSelectComponent} from "./form/controls/form.control.select.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {FormControlLabelComponent} from "./form/controls/form.control.label.component";
import {FormControlInputComponent} from "./form/controls/form.control.input.component";
import {ReactiveFormsModule} from "@angular/forms";
import {FormControlDateComponent} from "./form/controls/form.control.date.component";
import {FormControlErrorMsgComponent} from "./form/validation/form.control.error.msg.component";
import {FormGroupComponent} from "./form/group/form.group.component";
import {FormComponent} from "./form/form.component";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {FormControlValidationService} from "./form/validation/form.control.validation.service";
import {EditButton} from "./ui/buttons/edit.button";
import {DocumentKeyEventService} from "./keyboard/document.key.event.service";
import {KeysJunctionFactory} from "./keyboard/keys.junction";
import {Keys} from "./keyboard/keys";

@NgModule({
  declarations: [
    EditButton,
    FormControlDateComponent,
    FormComponent,
    FormGroupComponent,
    FormControlInputComponent,
    FormControlLabelComponent,
    FormControlSelectComponent,
    FormControlErrorMsgComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule
  ],
  exports: [
    EditButton,
    FormComponent,
    FormGroupComponent,
    FormControlDateComponent,
    FormControlInputComponent,
    FormControlLabelComponent,
    FormControlSelectComponent,
    FormControlErrorMsgComponent
  ],
  providers: [
    FormControlValidationService,
    DocumentKeyEventService,
    Keys,
    KeysJunctionFactory
  ]
})
export class UtilsModule {}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}