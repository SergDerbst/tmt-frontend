import { FormElementBase } from './form.element.base';

export class FormElementInputText extends FormElementBase<string> {
    controlType = 'input';
    type = 'text';

    constructor(options: {} = {}) {
        super(options);
    }
}