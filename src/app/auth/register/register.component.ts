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
	formConfig: FormConfig;
	
	constructor(public translate: TranslateService,
	            private fb: FormBuilder) {
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
				index: 6
			}),
			new FormControlConfig(<FormControl> personalData.formGroup.controls.sex).setConfiguration({
				name: 'sex',
				type: 'select',
				required: true,
				index: 7,
				data: [Sex.Male, Sex.Female, Sex.Other]
			})
		]);
		
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
				type: 'input.text',
				required: true,
				index: 9
			}),
			new FormControlConfig(<FormControl> credentials.formGroup.controls.passwordConfirm).setConfiguration({
				name: 'passwordConfirm',
				type: 'input.text',
				required: true,
				index: 10
			}),
			new FormControlConfig(<FormControl> credentials.formGroup.controls.email).setConfiguration({
				name: 'email',
				type: 'input.text',
				required: true,
				index: 11
			}),
			new FormControlConfig(<FormControl> credentials.formGroup.controls.emailConfirm).setConfiguration({
				name: 'emailConfirm',
				type: 'input.text',
				required: true,
				index: 12
			})
		]);
		
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