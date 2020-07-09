import {Component, Input, OnInit} from "@angular/core";
import {FormControl} from "@angular/forms";
import {FormControlConfig} from "../config/form.group.config";

/**
 * Generic basic component for form. Form properties will be stacked
 * vertically with labels to the left and the respective input elements
 * to the right. The form elements will be centered horizontally.
 *
 */
@Component({
	selector: 'tmt-form-control-generic-basic',
	templateUrl: './form.control.generic.base.component.html',
	styleUrls: ['./form.control.generic.base.component.scss']
})
export class FormControlGenericBaseComponent {
	@Input() formName: string;
	@Input() controlName: string;
	@Input() controlConfig: FormControlConfig;
}