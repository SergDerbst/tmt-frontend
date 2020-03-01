import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { FormAssemblyService } from './services/form.assembly.service';
import { FormComponentConfig } from "./config/form.component.config";
import {SortService} from "../../_utils/sort/sort.service";

@Component({
  selector: 'tmt-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() formConfig: FormComponentConfig;
  caption: string;
  form: FormGroup;

  constructor(
    private formService: FormAssemblyService,
    private sortService: SortService,
    public translate: TranslateService
  ) {
    translate.addLangs(['de', 'en']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.form = this.formService.assemble(this.formConfig);
  }

  onSubmit() {
    this.formConfig.config.submitService.submit(this.form.value, this.formConfig.config.submitTarget);
  }
  
  designatedOrder = this.sortService.designatedOrder;
}