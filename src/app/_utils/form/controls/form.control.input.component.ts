import {AfterViewInit, Component, Input, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {FormControl} from "@angular/forms";

@Component({
	selector: 'tmt-form-control-input',
	templateUrl: './form.control.input.component.html',
	styleUrls: ['./form.control.input.component.scss']
})
export class FormControlInputComponent {
	@Input() formName: string;
	@Input() controlName: string;
	@Input() control: FormControl;
	@Input() index: number;
	@Input() type: string;
	
	constructor(public translate: TranslateService) {}
}