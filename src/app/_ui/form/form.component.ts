import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormElementService } from './elements/form.element.service';

@Component({
  selector: 'tmt-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() formConfig: any;
  caption: string;
  elements: FormGroup;

  constructor(private fElementService: FormElementService) {
  }

  ngOnInit(): void {
    this.caption = this.formConfig.caption;
    this.elements = this.fElementService.formGroup(this.formConfig.elements);
    console.log(this.elements);
  }

  onSubmit() {
    console.log('uga baluga');
  }
}
