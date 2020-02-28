import { FormElementBase } from "./_elements/form.element.base";
import { FormElementButton } from "./_elements/form.element.button";
import { FormElementLink } from "./_elements/form.element.link";
import { FormSubmitService } from "./_services/form.submit.service";

export class FormConfig {
    id: string;
    text: string;
    markRequired: boolean;
    submitService: FormSubmitService;
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
        markRequired?: boolean,
        submitService?: FormSubmitService,
        groups?: {
            caption: string,
            captionVisible: boolean,
            elements: FormElementBase<string>[] 
        }[],
        buttons?: FormElementButton[],
        links?: FormElementLink[]
    }) {
        this.id = formConfig.id;
        this.text = formConfig.text;
        this.markRequired = formConfig.markRequired;
        this.submitService = formConfig.submitService;
        this.groups = formConfig.groups;
        this.buttons = formConfig.buttons;
        this.links = formConfig.links;
    }
}