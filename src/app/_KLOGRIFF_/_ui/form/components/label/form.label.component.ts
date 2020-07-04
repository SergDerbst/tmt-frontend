import {Component, Input, OnInit} from "@angular/core";
import {FormControlConfig} from "../../config/controls/form.control.config";
import {FormControl} from "@angular/forms";

@Component({
	selector: 'tmt-form-label',
	templateUrl: './form.label.component.html',
	styleUrls: ['./form.label.component.scss']
})
export class FormLabelComponent implements OnInit {
	@Input() formId: string;
	@Input() control: FormControl;
	@Input() showRequired: boolean;
	@Input() config: FormControlConfig;
	
	ngOnInit(): void {}
}