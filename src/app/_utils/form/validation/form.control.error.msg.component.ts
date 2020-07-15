import {AfterViewInit, Component, Input, OnInit} from "@angular/core";
import {FormControl} from "@angular/forms";
import {FormControlConfig} from "../config/form.config";

@Component({
	selector: 'tmt-form-control-error-msg',
	templateUrl: './form.control.error.mgs.component.html',
	styleUrls: ['./form.control.error.msg.component.scss']
})
export class FormControlErrorMsgComponent implements OnInit {
	@Input() control: FormControl;
	@Input() controlName: string;
	@Input() formName: string;
	@Input() config: FormControlConfig;
	
	ngOnInit(): void {}
}