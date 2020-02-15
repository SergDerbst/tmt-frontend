import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormElementBase } from './form.element.base';

@Injectable()
export class FormElementService {
    constructor() {}

    formGroup(elements: FormElementBase<string>[]) {
        let group: any = {};

        elements.forEach(element => {
            group[element.key] = element.required ?
                new FormControl(element.value || '', Validators.required) :
                new FormControl(element.value || '');
            group[element.key].label = element.label;
            group[element.key].type = element.type;
        });
        return new FormGroup(group);
    }
}