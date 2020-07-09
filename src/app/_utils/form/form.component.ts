import {Component, Input} from "@angular/core";
import {FormConfig} from "./config/form.group.config";

@Component({
	selector: 'tmt-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent {
	@Input() formName: string;
	@Input() formConfig: FormConfig;
	
	onSubmit() {
		console.log('arsch Puperz');
	}
}