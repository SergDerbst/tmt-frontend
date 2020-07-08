import {AfterViewInit, Component, Input, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {Sex, Title} from "../../../_data/enums";

@Component({
	selector: 'tmt-auth-register-personal-data',
	templateUrl: './personal.data.component.html',
	styleUrls: ['./personal.data.component.scss']
})
export class PersonalDataComponent implements OnInit, AfterViewInit {
	@Input() personalData: FormGroup;
	dataOptions = {
		title: [Title.Mr, Title.Ms],
		sex: [Sex.Male, Sex.Female, Sex.Other]
	};
	
	constructor(public translate: TranslateService) {
		translate.addLangs(['de', 'en']);
		translate.setDefaultLang('en');
	}
	
	ngAfterViewInit(): void {
	}
	
	ngOnInit(): void {
		console.log('Alla Aller Busch');
		console.log(this.personalData.controls.title);
	}
}