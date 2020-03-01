import { FormElementBase } from './form.element.base';

export class FormElementLink extends FormElementBase<string> {
    controlType = "anchor";

    constructor(options: {} = {}) {
        super(options);
    }
}