import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { FormComponent } from './form/form.component';
import { FormElementService } from './form/elements/form.element.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    FormComponent
  ],
  exports: [
    FormComponent
  ],
  providers: [
    FormElementService
  ]
})
export class UiModule {}
