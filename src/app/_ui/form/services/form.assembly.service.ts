import { Injectable } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { FormElementBase } from '../elements/form.element.base';
import { FormComponentConfig } from "../config/form.component.config";
import { FormControlValidationConfig } from '../config/form.control.validation.config';
import {FormControlConfig} from "../config/form.control.config";

@Injectable()
export class FormAssemblyService {
    
    constructor(private fb: FormBuilder) {}

    assemble(config: FormComponentConfig):FormGroup {
        let group = this.fb.group(this.formControlGroups(config.groups));
        group['config'] = config.config;
        group['buttons'] = this.xtraElements(config.buttons);
        group['links'] = this.xtraElements(config.links);
        console.log('arsch popo grande slap');
        console.log(group);
        return group;
    }
    
    private xtraElements(xtraElements: FormElementBase<string>[]) {
        let xtras: any[] = [];
        if (xtraElements !== undefined) {
            for (let i = 0, len = xtraElements.length; i < len; i++) {
                xtras[xtraElements[i].key] = xtraElements[i];
            }
        }
        return xtras;
    }
    
    private formControlGroups(groups: {
                            caption: string,
                            captionVisible: boolean,
                            elements: FormElementBase<string>[]
                        }[]) {
        let controlGroups = {};
        if (groups !== undefined) {
            for (let i = 0, len = groups.length; i < len; i++) {
                controlGroups[groups[i].caption] = this.formControlGroup(groups[i].elements);
                controlGroups[groups[i].caption].config = {
                    caption: groups[i].caption,
                    captionVisible: groups[i].captionVisible,
                    order: i
                }
            }
        }
        return controlGroups;
    }
    
    private formControlGroup(elements: FormElementBase<string>[]):FormGroup {
        let formControls: any = {};
        if (elements !== undefined) {
            for (let i = 0, len = elements.length; i < len; i++) {
                formControls[elements[i].key] = this.validatedFormControl(elements[i]);
            }
        }
        return this.fb.group(formControls);
    }
    
    private validatedFormControl(element:{
            value: any,
            validators?: FormControlValidationConfig[] }):FormControl {
        element.validators = element.validators || [];
        let validators: ValidatorFn[] = [];
        let validation = {};
        for (let i = 0, len = element.validators.length; i < len; i++) {
            validators.push(element.validators[i].validator);
            validation[element.validators[i].name] = element.validators[i].active;
        }
        return this.configuredFormControl(element, validation, validators);
    }
    
    private configuredFormControl(element: any, validation: any, validators: ValidatorFn[]):FormControl {
        let formControl = new FormControl(element.value || '', validators);
        let controlConfig = new FormControlConfig({
            type: element.type,
            order: element.order,
            validation: validation,
            autocomplete: {
                data: element['data'],
                fetchSelect: element['fetchSelect'],
                selection: element['selection']
            },
            select: {
                items: element['items']
            }
        });
        if (controlConfig.select.items && controlConfig.select.items.length > 0) {
            formControl.setValue(controlConfig.select.items[0].value);
        }
        formControl['config'] = controlConfig;
        return formControl;
    }
}