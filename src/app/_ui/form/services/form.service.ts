import { Injectable } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { FormElementBase } from '../elements/form.element.base';
import { FormConfig } from "../form.config";

@Injectable()
export class FormService {
    constructor(private fb: FormBuilder) {}

    assemble(config: FormConfig) {
        let group = this.fb.group(this.formElements(config.groups));
        group['id'] = config.id;
        group['text'] = config.text;
        group['markRequired'] = config.markRequired;
        group['buttons'] = this.xtraElements(config.buttons);
        group['links'] = this.xtraElements(config.links);
        return group;
    }

    private xtraElements(controlElements: FormElementBase<string>[]) {
        let group: any[] = [];
        if (controlElements !== undefined) {
            for (var i = 0, len = controlElements.length; i < len; i++) {
                group[controlElements[i].key] = controlElements[i];
            }
        }
        return group;
    }

    private formElements(groups: {
                            caption: string,
                            captionVisible: boolean,
                            elements: FormElementBase<string>[]
                        }[]) {
        let elements = {};
        if (groups !== undefined) {
            for (var i = 0, len = groups.length; i < len; i++) {
                elements[groups[i].caption] = this.formControlGroup(groups[i].elements);
                elements[groups[i].caption].captionVisible = groups[i].captionVisible;
                elements[groups[i].caption].order = i;
            }
        }
        return elements;
    }

    private formControlGroup(elements: FormElementBase<string>[]) {
        let group: any = {};
        if (elements !== undefined) {
            for (var i = 0, len = elements.length; i < len; i++) {
                group[elements[i].key] = elements[i].required ?
                    new FormControl(elements[i].value || '', Validators.required) :
                    new FormControl(elements[i].value || '');
                group[elements[i].key].label = elements[i].label;
                group[elements[i].key].type = elements[i].type;
                group[elements[i].key].order = elements[i].order;
                group[elements[i].key].required = elements[i].required;
                group[elements[i].key].items = elements[i]['items'];
                group[elements[i].key].data = elements[i]['data'];
                group[elements[i].key].fetchSelect = elements[i]['fetchSelect'];
                group[elements[i].key].selection = elements[i]['selection'];
            }
        }
        return this.fb.group(group);
    }
}