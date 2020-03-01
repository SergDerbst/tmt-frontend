import {Component, Input} from "@angular/core";
import {FormControl} from "@angular/forms";

@Component({
	selector: 'tmt-form-select',
	templateUrl: './form.select.component.html',
	styleUrls: ['./form.select.component.scss']
})
export class FormSelectComponent {
	@Input() formId: string;
	@Input() controlId: string;
	@Input() control: FormControl
}