import {AfterViewInit, Component, Input, OnInit} from "@angular/core";
import {FormControl} from "@angular/forms";

@Component({
	selector: 'tmt-form-control-error-msg',
	templateUrl: './form.control.error.mgs.component.html',
	styleUrls: ['./form.control.error.msg.component.scss']
})
export class FormControlErrorMsgComponent {
	@Input() control: FormControl;
	@Input() controlName: string;
	@Input() formName: string;
}