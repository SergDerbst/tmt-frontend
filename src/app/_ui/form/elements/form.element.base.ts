import { FormControlValidationConfig } from "../config/form.control.validation.config";

export class FormElementBase<T> {
    value: T;
    key: string;
    label: string;
    order: number;
    controlType: string;
    type: string;
    orientation: string;
    validators: FormControlValidationConfig[];
    href: string;

    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        order?: number,
        controlType?: string,
        type?: string,
        orientation?: string,
        validators?: FormControlValidationConfig[],
        href?: string,
        fetch?: () => any;
        currentSelect?: number;
    } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.type = options.type || '';
        this.orientation = options.orientation;
        this.validators = options.validators || [];
        this.href = options.href;
    }
}