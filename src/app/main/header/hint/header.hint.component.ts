import {Component, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {HintData} from "./header.hint.data";
import {HeaderHintService} from "./header.hint.service";

@Component({
	selector: 'tmt-header-hint',
	templateUrl: './header.hint.component.html',
	styleUrls: ['./header.hint.component.scss']
})
export class HeaderHintComponent implements OnInit {
	hint: HintData;
	
	constructor(public translate: TranslateService,
	            private hintService: HeaderHintService) {
		translate.addLangs(['de', 'en']);
		translate.setDefaultLang('en');
		this.hint = this.hintService.hint;
	}
	
	ngOnInit(): void {
	}
}