import {Component, Input, OnInit} from "@angular/core";
import {Snippet} from "../transcript.data";
import {TranslateService} from "@ngx-translate/core";
import {FormBuilder} from "@angular/forms";
import {FormControlValidationService} from "../../../_utils/form/validation/form.control.validation.service";

@Component({
	selector: 'tmt-control-panel',
	templateUrl: './control.panel.html',
	styleUrls: ['./control.panel.scss']
})
export class ControlPanel implements OnInit {
	@Input() snippet: Snippet;
	@Input() formId: string;
	
	constructor(public translate: TranslateService) {
	}
	
	ngOnInit(): void {
	}
}