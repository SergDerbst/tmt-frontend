import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

import {FormAssemblyService} from './services/form.assembly.service';
import {SortService} from "../../_utils/sort/sort.service";
import {FormConfig} from "./config/form.config";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'tmt-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, AfterViewInit {
  @Input() formConfig: FormConfig;
  form: FormGroup;
  isSubmitting:boolean;
  

  constructor(
    private formService: FormAssemblyService,
    private sortService: SortService,
    public translate: TranslateService
  ) {
    translate.addLangs(['de', 'en']);
    translate.setDefaultLang('en');
    this.isSubmitting = false;
  }

  ngOnInit(): void {
    this.form = this.formService.assemble(this.formConfig);
  }
  
  ngAfterViewInit(): void {}

  onSubmit() {
    console.log('submit mein arsch');
    //this.formConfig.config.submitService.submit(this.form.value, this.formConfig.config.submitUrl);
  }
  
  designatedOrder = this.sortService.designatedOrder;
}