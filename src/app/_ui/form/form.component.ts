import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormElementService } from './elements/form.element.service';
import { SortService } from '../../_utils/sort/sort.service';

@Component({
  selector: 'tmt-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() formConfig: any;
  caption: string;
  elements: FormGroup;
  buttons: any;
  links: any;

  constructor(
      private fElementService: FormElementService, 
      private sortService: SortService) {
  }

  ngOnInit(): void {
    this.caption = this.formConfig.caption;
    this.elements = this.fElementService.formGroup(this.formConfig.elements);
    this.buttons = this.fElementService.buttons(this.formConfig.buttons);
    this.links = this.fElementService.links(this.formConfig.links);
  }
  
  designatedOrder = this.sortService.designatedOrder;

  onSubmit() {
    console.log('uga baluga');
  }
}
