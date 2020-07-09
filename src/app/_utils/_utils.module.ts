import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SortService } from './sort/sort.service';
import {FormControlSelectComponent} from "./form/controls/form.control.select.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {httpTranslateLoader} from "../_KLOGRIFF_/_ui/_ui.module";
import {HttpClient} from "@angular/common/http";
import {FormControlLabelComponent} from "./form/controls/form.control.label.component";
import {FormControlInputComponent} from "./form/controls/form.control.input.component";
import {ReactiveFormsModule} from "@angular/forms";
import {FormControlDateComponent} from "./form/controls/form.control.date.component";
import {FormControlErrorMsgComponent} from "./form/validation/form-control-error-msg.component";
import {FormControlGenericBaseComponent} from "./form/group/form.control.generic.base.component";
import {FormGroupComponent} from "./form/group/form.group.component";
import {FormComponent} from "./form/form.component";

@NgModule({
  declarations: [
    FormControlDateComponent,
    FormComponent,
    FormGroupComponent,
    FormControlGenericBaseComponent,
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
    FormComponent,
    FormGroupComponent,
    FormControlGenericBaseComponent,
    FormControlDateComponent,
    FormControlInputComponent,
    FormControlLabelComponent,
    FormControlSelectComponent,
    FormControlErrorMsgComponent
  ],
  providers: [
    SortService
  ]
})
export class UtilsModule { }
