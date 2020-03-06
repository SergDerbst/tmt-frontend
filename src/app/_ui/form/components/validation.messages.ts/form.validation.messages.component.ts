import {Component, Input, OnInit} from "@angular/core";
import {FormConfig} from "../../config/form.config";
import {FormControl} from "@angular/forms";
import {FormControlConfig} from "../../config/controls/form.control.config";

@Component({
	selector: 'tmt-validation-msg',
	templateUrl: './form.validation.messages.component.html',
	styleUrls: ['./form.validation.messages.component.scss']
})
export class FormValidationMessagesComponent implements OnInit {
	@Input() formConfig: FormConfig;
	@Input() controlConfig: FormControlConfig;
	@Input() control: FormControl;
	
	ngOnInit(): void {}
}