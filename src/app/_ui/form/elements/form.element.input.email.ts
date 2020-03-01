import { FormElementBase } from './form.element.base';

export class FormElementInputEmail extends FormElementBase<string> {
    type = "email";

    constructor(options: {} = {}) {
        super(options);
    }
}