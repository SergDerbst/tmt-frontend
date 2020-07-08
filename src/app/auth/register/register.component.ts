import {AfterViewInit, Component, Input, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {Sex, Title} from "../../_data/enums";

@Component({
	selector: 'tmt-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {
	form: FormGroup;
	
	constructor(public translate: TranslateService,
	            private fb: FormBuilder) {
		translate.addLangs(['de', 'en']);
		translate.setDefaultLang('en');
	}
	
	ngAfterViewInit(): void {
	}
	
	ngOnInit(): void {
		this.form = this.fb.group({
			personalData: this.fb.group({
				title: [Title.Mr, Validators.required],
				firstName: ['', Validators.required],
				middleName: [''],
				lastName: ['', Validators.required],
				dayOfBirth: ['', Validators.required],
				sex: [Sex.Male, Validators.required]
			}),
			credentials: this.fb.group({
				username: ['', Validators.required],
				password: ['', Validators.required],
				passwordConfirm: ['', Validators.required],
				email: ['', Validators.required],
				emailConfirm: ['', Validators.required],
			})
		});
	}
	
	onSubmit(): void {
		console.log('Orgo Borgo Balutsch');
	}
}