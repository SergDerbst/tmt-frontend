export class FormElementBase<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    type: string;
    orientation: string;
    validate: boolean;
    href: string;
    options: { key: string, value: string }[];

    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        required?: boolean,
        order?: number,
        controlType?: string,
        type?: string,
        orientation?: string,
        validate?: boolean,
        href?: string,
        options?: { key: string, value: string}[]
    } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.type = options.type || '';
        this.orientation = options.orientation;
        this.validate = options.validate;
        this.href = options.href;
    }
}