import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {Sex, Title} from "../../_utils/data/enums";
import {FormControlValidationService} from "../../_utils/form/validation/form.control.validation.service";
import {FormConfig, FormGroupConfig, FormControlConfig} from "../../_utils/form/config/form.group.config";
import {FormControlValidationDate} from "../../_utils/form/validation/form.control.validation.date";

@Component({
	selector: 'tmt-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	formConfig: FormConfig;
	
	constructor(public translate: TranslateService,
	            private fb: FormBuilder,
	            private validation: FormControlValidationService) {
		translate.addLangs(['de', 'en']);
		translate.setDefaultLang('en');
	}
	
	ngOnInit(): void {
		let personalData = this.personalData();
		let credentials = this.credentials();
		
		this.formConfig = new FormConfig(this.fb.group({
			personalData: personalData.formGroup,
			credentials: credentials.formGroup
		})).setGroups([
			personalData,
			credentials
		]);
	}
	
	private personalData() {
		let personalData = new FormGroupConfig(this.fb.group({
			title: [Title.Mr],
			firstName: [''],
			middleName: [''],
			lastName: [''],
			dayOfBirth: [''],
			sex: [Sex.Male]
		})).setConfiguration({
			name: 'personalData'
		});
		
		personalData.setControls([
			new FormControlConfig(<FormControl> personalData.formGroup.controls.title).setConfiguration({
				name: 'title',
				type: 'select',
				required: true,
				index: 2,
				data: [Title.Mr, Title.Ms]
			}),
			new FormControlConfig(<FormControl> personalData.formGroup.controls.firstName).setConfiguration({
				name: 'firstName',
				type: 'input.text',
				required: true,
				index: 3
			}),
			new FormControlConfig(<FormControl> personalData.formGroup.controls.middleName).setConfiguration({
				name: 'middleName',
				type: 'input.text',
				required: false,
				index: 4
			}),
			new FormControlConfig(<FormControl> personalData.formGroup.controls.lastName).setConfiguration({
				name: 'lastName',
				type: 'input.text',
				required: true,
				index: 5
			}),
			new FormControlConfig(<FormControl> personalData.formGroup.controls.dayOfBirth).setConfiguration({
				name: 'dayOfBirth',
				type: 'date',
				required: true,
				index: 6,
				minimumAge: FormControlValidationDate.Default_Minimum_Age,
				maximumAge: FormControlValidationDate.Default_Maximum_Age
			}),
			new FormControlConfig(<FormControl> personalData.formGroup.controls.sex).setConfiguration({
				name: 'sex',
				type: 'select',
				required: true,
				index: 7,
				data: [Sex.Male, Sex.Female, Sex.Other]
			})
		]);
		
		let title = personalData.formGroup.get('title'),
				firstName = personalData.formGroup.get('firstName'),
				lastName = personalData.formGroup.get('lastName'),
				dayOfBirth = personalData.formGroup.get('dayOfBirth'),
				sex = personalData.formGroup.get('sex');
		
		this.validation.prepare(title)
			.required()
			.compose();
		this.validation.prepare(firstName)
			.required()
			.compose();
		this.validation.prepare(lastName)
			.required()
			.compose();
		this.validation.prepare(dayOfBirth)
			.required()
			.date().complete()
			.compose();
		this.validation.prepare(sex)
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
		})).setConfiguration({
			name: 'credentials'
		});
		
		credentials.setControls([
			new FormControlConfig(<FormControl> credentials.formGroup.controls.username).setConfiguration({
				name: 'username',
				type: 'input.text',
				required: true,
				index: 8
			}),
			new FormControlConfig(<FormControl> credentials.formGroup.controls.password).setConfiguration({
				name: 'password',
				type: 'input.password',
				required: true,
				index: 9,
				minLength: 8
			}),
			new FormControlConfig(<FormControl> credentials.formGroup.controls.passwordConfirm).setConfiguration({
				name: 'passwordConfirm',
				type: 'input.password',
				required: true,
				index: 10
			}),
			new FormControlConfig(<FormControl> credentials.formGroup.controls.email).setConfiguration({
				name: 'email',
				type: 'input.email',
				required: true,
				index: 11
			}),
			new FormControlConfig(<FormControl> credentials.formGroup.controls.emailConfirm).setConfiguration({
				name: 'emailConfirm',
				type: 'input.email',
				required: true,
				index: 12
			})
		]);
		
		this.validation.prepare(credentials.formGroup.get('username'))
			.minLength(3)
			.required()
			.unique('username')
			.compose();
		this.validation.prepare(credentials.formGroup.get('password'))
			.password()
			.required()
			.compose();
		this.validation.prepare(credentials.formGroup.get('passwordConfirm'))
			.equalTo(credentials.formGroup.get('password')).password()
			.required()
			.compose();
		this.validation.prepare(credentials.formGroup.get('email'))
			.email()
			.required()
			.unique('email')
			.compose();
		this.validation.prepare(credentials.formGroup.get('emailConfirm'))
			.required()
			.equalTo(credentials.formGroup.get('email')).email()
			.compose();
		
		return credentials;
	}
}