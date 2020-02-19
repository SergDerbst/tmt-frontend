import { FormElementBase } from "./elements/form.element.base";
import { FormElementButton } from "./elements/form.element.button";
import { FormElementLink } from "./elements/form.element.link";

export class FormConfig {
    id: string;
    text: string;
    groups: {
        caption: string,
        captionVisible: boolean,
        elements: FormElementBase<string>[] 
    }[];
    buttons: FormElementButton[];
    links: FormElementLink[];
    
    constructor(formConfig: {
        id: string,
        text?: string,
        groups?: {
            caption: string,
            captionVisible: boolean,
            elements: FormElementBase<string>[] 
        }[],
        buttons?: FormElementButton[],
        links?: FormElementLink[]
    }) {
        this.id = formConfig.id;
        this.groups = formConfig.groups;
        this.buttons = formConfig.buttons;
        this.links = formConfig.links;
    }
}