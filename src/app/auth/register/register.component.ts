import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {Sex, Title} from "../../_utils/data/enums";
import {validation} from "../../_utils/form/validation/form.control.validation";
import {FormConfig, FormGroupConfig, FormControlConfig} from "../../_utils/form/config/form.group.config";

@Component({
	selector: 'tmt-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	form: FormConfig;
	
	constructor(public translate: TranslateService,
	            private fb: FormBuilder) {
		translate.addLangs(['de', 'en']);
		translate.setDefaultLang('en');
	}
	
	ngOnInit(): void {
		let personalData = this.personalData();
		let credentials = this.credentials();
		
		this.form = new FormConfig(this.fb.group({
			personalData: personalData.formGroup,
			credentials: credentials.formGroup
		}));
	}
	
	private personalData() {
		let personalData = new FormGroupConfig(this.fb.group({
			title: [Title.Mr],
			firstName: [''],
			middleName: [''],
			lastName: [''],
			dayOfBirth: [''],
			sex: [Sex.Male]
		}));
		
		personalData.setConfiguration({
			title: new FormControlConfig(<FormControl> personalData.formGroup.controls.title).setConfiguration({
				type: 'select',
				required: true,
				index: 2,
				data: [Title.Mr, Title.Ms]
			}),
			firstName: new FormControlConfig(<FormControl> personalData.formGroup.controls.firstName).setConfiguration({
				type: 'input.text',
				required: true,
				index: 3
			}),
			middleName: new FormControlConfig(<FormControl> personalData.formGroup.controls.middleName).setConfiguration({
				type: 'input.text',
				required: false,
				index: 4
			}),
			lastName: new FormControlConfig(<FormControl> personalData.formGroup.controls.lastName).setConfiguration({
				type: 'input.text',
				required: true,
				index: 5
			}),
			dayOfBirth: new FormControlConfig(<FormControl> personalData.formGroup.controls.dayOfBirth).setConfiguration({
				type: 'date',
				required: true,
				index: 6
			}),
			sex: new FormControlConfig(<FormControl> personalData.formGroup.controls.sex).setConfiguration({
				type: 'select',
				required: true,
				index: 7,
				data: [Sex.Male, Sex.Female, Sex.Other]
			}),
		});
		
		validation(personalData.formGroup.get('title'))
			.required()
			.compose();
		validation(personalData.formGroup.get('firstName'))
			.required()
			.compose();
		validation(personalData.formGroup.get('lastName'))
			.required()
			.compose();
		validation(personalData.formGroup.get('dayOfBirth'))
			.required()
			.compose();
		validation(personalData.formGroup.get('sex'))
			.required()
			.compose();
		
		return personalData;
	}
	
	private credentials() {
		let	credentials = new FormGroupConfig(this.fb.group({
			username: [''],
			password: [''],
			passwordConfirm: [''],
			email: [''],
			emailConfirm: [''],
		}));
		
		credentials.setConfiguration({
			username: new FormControlConfig(<FormControl> credentials.formGroup.controls.username).setConfiguration({
				type: 'input.text',
				required: true,
				index: 8
			}),
			password: new FormControlConfig(<FormControl> credentials.formGroup.controls.password).setConfiguration({
				type: 'input.text',
				required: true,
				index: 9
			}),
			passwordConfirm: new FormControlConfig(<FormControl> credentials.formGroup.controls.passwordConfirm).setConfiguration({
				type: 'input.text',
				required: true,
				index: 10
			}),
			email: new FormControlConfig(<FormControl> credentials.formGroup.controls.email).setConfiguration({
				type: 'input.text',
				required: true,
				index: 11
			}),
			emailConfirm: new FormControlConfig(<FormControl> credentials.formGroup.controls.emailConfirm).setConfiguration({
				type: 'input.text',
				required: true,
				index: 12
			}),
		});
		
		validation(credentials.formGroup.get('username'))
			.required()
			.minLength(3)
			.compose();
		validation(credentials.formGroup.get('password'))
			.required()
			.password()
			.compose();
		validation(credentials.formGroup.get('passwordConfirm'))
			.required()
			//TODO: equalValue(other: AbstractControl)
			.compose();
		validation(credentials.formGroup.get('email'))
			.required()
			.compose();
		validation(credentials.formGroup.get('emailConfirm'))
			.required()
			//TODO: equalValue(other: AbstractControl)
			.compose();
		
		return credentials;
	}
}