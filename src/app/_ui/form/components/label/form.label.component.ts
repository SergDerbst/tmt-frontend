import {Component, Input} from "@angular/core";
import {FormControlConfig} from "../../config/form.control.config";

@Component({
	selector: 'tmt-form-label',
	templateUrl: './form.label.component.html',
	styleUrls: ['./form.label.component.scss']
})
export class FormLabelComponent {
	@Input() formId: string;
	@Input() controlId: string;
	@Input() showRequired: boolean;
	@Input() config: FormControlConfig;
}