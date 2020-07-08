import {AfterViewInit, Component, Input, OnInit} from "@angular/core";
import {FormControl} from "@angular/forms";

@Component({
	selector: 'tmt-form-control-validation-msg',
	templateUrl: './validation.mgs.component.html',
	styleUrls: ['./validation.msg.component.scss']
})
export class ValidationMsgComponent implements OnInit, AfterViewInit {
	@Input() control: FormControl;
	@Input() controlMsgId: string;
	@Input() formMsgId: string;
	@Input() errorMsgId: string;
	
	ngAfterViewInit(): void {
	}
	
	ngOnInit(): void {
	}
}