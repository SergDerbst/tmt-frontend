import {AfterViewInit, Component, Input, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Component({
	selector: 'tmt-form-control-label',
	templateUrl: './form.control.label.component.html',
	styleUrls: ['./form.control.label.component.scss']
})
export class FormControlLabelComponent  {
	@Input() controlName: string;
	@Input() required: boolean;
	@Input() translatePrefix: string;
	
	constructor(public translate: TranslateService) {
		translate.addLangs(['de', 'en']);
		translate.setDefaultLang('en');
	}
}