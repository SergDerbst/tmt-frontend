import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormElementBase } from './form.element.base';
import {FormElementButton} from "./form.element.button";
import {FormElementLink} from "./form.element.link";

@Injectable()
export class FormElementService {
    constructor() {}

    formGroup(elements: FormElementBase<string>[]) {
        let group: any = {};
        for (var i = 0, len = elements.length; i < len; i++) {
            group[elements[i].key] = elements[i].required ?
                new FormControl(elements[i].value || '', Validators.required) :
                new FormControl(elements[i].value || '');
            group[elements[i].key].label = elements[i].label;
            group[elements[i].key].type = elements[i].type;
            group[elements[i].key].order = elements[i].order;
        }
        return new FormGroup(group);
    }

    buttons(buttons: FormElementButton[]) {
        return this.controlElements(buttons);
    }

    links(links: FormElementLink[]) {
        return this.controlElements(links);
    }

    private controlElements(controlElements: FormElementBase<string>[]) {
        let group: any = {};
        for (var i = 0, len = controlElements.length; i < len; i++) {
            group[controlElements[i].key] = controlElements[i];
        }
        return group;
    }
}