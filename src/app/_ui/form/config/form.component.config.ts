import { FormElementButton } from "../elements/form.element.button";
import { FormElementLink } from "../elements/form.element.link";
import { FormSubmitService } from "../services/form.submit.service";
import { FormControlGroupConfig } from "./form.control.group.config";
import { FormConfig } from "./form.config";

/**
 * Configuration of forms within host components. It determines the form, how it is handled,
 * and validated, etc.
 */
export class FormComponentConfig {
    config: FormConfig;
    groups: FormControlGroupConfig[];
    buttons: FormElementButton[];
    links: FormElementLink[];
    
    constructor(formConfig: {
        config: FormConfig,
        groups?: FormControlGroupConfig[],
        buttons?: FormElementButton[],
        links?: FormElementLink[]
    }) {
        this.config = formConfig.config;
        this.groups = formConfig.groups;
        this.buttons = formConfig.buttons;
        this.links = formConfig.links;
    }
}
