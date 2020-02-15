import { FormElementBase } from './form.element.base';

export class FormElementInputPassword extends FormElementBase<string> {
    controlType = "input";
    type = "password";

    constructor(options: {} = {}) {
        super(options);
    }
}