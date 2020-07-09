import {Component, Input} from "@angular/core";
import {FormGroupConfig} from "../config/form.group.config";

@Component({
	selector: 'tmt-form-group',
	templateUrl: './form.group.component.html',
	styleUrls: ['./form.group.component.scss']
})
export class FormGroupComponent {
	@Input() formName: string;
	@Input() groupName: string;
	@Input() groupConfig: FormGroupConfig;
}