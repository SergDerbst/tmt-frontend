import {AfterViewInit, Component, OnInit} from "@angular/core";
import {FormConfig, FormControlConfig, FormGroupConfig} from "../../_utils/form/config/form.group.config";
import {TranslateService} from "@ngx-translate/core";
import {FormControlValidationService} from "../../_utils/form/validation/form.control.validation.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {log} from "util";
import {Observable} from "rxjs";
import {AuthService} from "../auth.service";

@Component({
	selector: 'tmt-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	formConfig: FormConfig;
	
	constructor(public translate: TranslateService,
	            private fb: FormBuilder,
	            private validation: FormControlValidationService,
	            private authService: AuthService) {
	}
	
	ngOnInit(): void {
		let loginGroup = this.loginGroup();
		
		this.formConfig = new FormConfig(this.fb.group({
			login: loginGroup.formGroup
		}), ():void => {
			this.authService.login(this.formConfig.form.value);
		}).setGroups([
			loginGroup
		]);
	}
	
	private loginGroup() {
		let loginGroup = new FormGroupConfig(this.fb.group({
			username: [''],
			password: ['']
		})).setConfiguration({
			name: 'login'
		});
		
		loginGroup.setControls([
			new FormControlConfig(<FormControl> loginGroup.formGroup.controls.username).setConfiguration({
				name: 'username',
				type: 'input.text',
				required: true,
				index: 2
			}),
			new FormControlConfig(<FormControl> loginGroup.formGroup.controls.password).setConfiguration({
				name: 'password',
				type: 'input.password',
				required: true,
				index: 2
			})
		]);
		
		let username = loginGroup.formGroup.get('username'),
				password = loginGroup.formGroup.get('password');
		
		this.validation.prepare(username)
			.required()
			.compose();
		this.validation.prepare(password)
			.required()
			.compose();
		
		return loginGroup;
	}
}