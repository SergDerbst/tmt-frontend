import {AfterViewInit, Component, Input, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {FormGroup} from "@angular/forms";

@Component({
	selector: 'tmt-auth-register-credentials',
	templateUrl: './credentials.component.html',
	styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent implements OnInit, AfterViewInit {
	@Input() credentials: FormGroup;
	
	constructor(public translate: TranslateService) {
		translate.addLangs(['de', 'en']);
		translate.setDefaultLang('en');
	}
	
	ngAfterViewInit(): void {
	}
	
	ngOnInit(): void {
	}
}