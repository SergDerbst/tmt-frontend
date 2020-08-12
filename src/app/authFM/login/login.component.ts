import {Component, OnInit} from "@angular/core";
import {FormConfig, FormControlConfig, FormGroupConfig} from "../../_utils/form/config/form.config";
import {TranslateService} from "@ngx-translate/core";
import {FormControlValidationService} from "../../_utils/form/validation/form.control.validation.service";
import {FormBuilder, FormControl} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

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
	            private authService: AuthService,
	            private router: Router) {
	}
	
	ngOnInit(): void {
		let loginGroup = this.loginGroup();
		
		this.formConfig = new FormConfig(this.fb.group({
			login: loginGroup.formGroup
		}), ():void => {
			this.authService.login(this.formConfig.form.value).subscribe(
				response => {
					let data = <{ username: string, token: string }> response.body;
					localStorage.setItem('tmt-username', data.username);
					localStorage.setItem('tmt-token', data.token);
					//TODO handle redirect to recent route
					return this.router.navigateByUrl('/');
				},error => {
					this.formConfig.setErrorMessage(error.error.name, error.error.properties);
				});
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