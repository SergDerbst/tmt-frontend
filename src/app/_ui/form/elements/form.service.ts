import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormElementBase } from './form.element.base';
import { FormConfig } from "../form.config";

@Injectable()
export class FormService {
    constructor(private fb: FormBuilder) {}

    assemble(config: FormConfig) {
        let group = this.fb.group(this.formElements(config.groups));
        group['id'] = config.id;
        group['text'] = config.text;
        group['buttons'] = this.xtraElements(config.buttons);
        group['links'] = this.xtraElements(config.links);
        return group;
    }

    private xtraElements(controlElements: FormElementBase<string>[]) {
        let group: any[] = [];
        for (var i = 0, len = controlElements.length; i < len; i++) {
            group[controlElements[i].key] = controlElements[i];
        }
        return group;
    }

    private formElements(groups: {
                            caption: string,
                            captionVisible: boolean,
                            elements: FormElementBase<string>[]
                        }[]) {
        let elements = {};
        for (var i = 0, len = groups.length; i < len; i++) {
            elements[groups[i].caption] = this.formControlGroup(groups[i].elements);
            elements[groups[i].caption].captionVisible = groups[i].captionVisible;
            elements[groups[i].caption].order = i;
        }
        return elements;
    }

    private formControlGroup(elements: FormElementBase<string>[]) {
        let group: any = {};
        for (var i = 0, len = elements.length; i < len; i++) {
            group[elements[i].key] = elements[i].required ?
                new FormControl(elements[i].value || '', Validators.required) :
                new FormControl(elements[i].value || '');
            group[elements[i].key].label = elements[i].label;
            group[elements[i].key].type = elements[i].type;
            group[elements[i].key].order = elements[i].order;
        }
        return this.fb.group(group);
    }
}