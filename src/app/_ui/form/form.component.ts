import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { FormService } from './services/form.service';
import { SortService } from '../../_utils/sort/sort.service';
import { FormConfig } from "./form.config";

@Component({
  selector: 'tmt-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() formConfig: FormConfig;
  caption: string;
  form: FormGroup;

  constructor(
    private formService: FormService,
    private sortService: SortService,
    public translate: TranslateService
  ) {
    translate.addLangs(['de', 'en']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.form = this.formService.assemble(this.formConfig);
  }

  designatedOrder = this.sortService.designatedOrder;

  onSubmit() {
    console.log('uga baluga');
  }
}
