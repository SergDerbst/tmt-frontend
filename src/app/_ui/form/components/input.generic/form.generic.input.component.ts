import {AfterViewInit, Component, Input, OnInit, ViewChild} from "@angular/core";
import {FormConfig} from "../../config/form.config";
import {FormControlConfig} from "../../config/controls/form.control.config";
import {FormControl, FormGroup} from "@angular/forms";
import {FormElementFocusService} from "../../services/form.element.focus.service";

@Component({
	selector: 'tmt-form-generic-input',
	templateUrl: './form.generic.input.component.html',
	styleUrls: ['./form.generic.input.component.scss']
})
export class FormGenericInputComponent implements OnInit, AfterViewInit {
	@Input() form: FormGroup;
	@Input() formConfig: FormConfig;
	@Input() control: FormControl;
	@Input() controlConfig: FormControlConfig;
	@ViewChild('focusElement') focusElement;
	
	constructor(private elementFocusService: FormElementFocusService) {}
	
	ngOnInit(): void {
		this.control.valueChanges.subscribe(value => {
			this.controlConfig.shouldValidate(true);
		});
	}
	
	ngAfterViewInit(): void {
		this.elementFocusService.setFocus(this.focusElement, this.formConfig.firstFocus);
	}
}
