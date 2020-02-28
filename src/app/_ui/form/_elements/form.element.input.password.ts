import { FormElementBase } from './form.element.base';

export class FormElementInputPassword extends FormElementBase<string> {
    type = "password";

    constructor(options: {} = {}) {
        super(options);
    }
}