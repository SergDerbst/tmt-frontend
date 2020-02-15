import { FormElementBase } from './form.element.base';

export class FormElementButton extends FormElementBase<string> {
    controlType = "button";

    constructor(options: {} = {}) {
        super(options);
    }
}