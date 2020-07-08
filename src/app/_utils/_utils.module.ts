import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SortService } from './sort/sort.service';
import {SelectComponent} from "./forms/components/select.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {httpTranslateLoader} from "../_KLOGRIFF_/_ui/_ui.module";
import {HttpClient} from "@angular/common/http";
import {LabelComponent} from "./forms/components/label.component";
import {InputComponent} from "./forms/components/input.component";
import {ReactiveFormsModule} from "@angular/forms";
import {DateComponent} from "./forms/components/date.component";
import {ValidationMsgComponent} from "./forms/components/validation.msg.component";

@NgModule({
  declarations: [
    DateComponent,
    InputComponent,
    LabelComponent,
    SelectComponent,
    ValidationMsgComponent
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
    DateComponent,
    InputComponent,
    LabelComponent,
    SelectComponent,
    ValidationMsgComponent
  ],
  providers: [
    SortService
  ]
})
export class UtilsModule { }
