import {Component, Input} from "@angular/core";
import {FormControlConfig} from "../../config/form.control.config";
import {FormControl} from "@angular/forms";

@Component({
	selector: 'tmt-form-generic-input',
	templateUrl: './form.generic.input.component.html',
	styleUrls: ['./form.generic.input.component.scss']
})
export class FormGenericInputComponent {
	@Input() control: FormControl;
}