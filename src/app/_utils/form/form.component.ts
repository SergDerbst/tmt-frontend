import {Component, Input, OnInit} from "@angular/core";
import {FormConfig} from "./config/form.group.config";
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";

@Component({
	selector: 'tmt-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
	@Input() formName: string;
	@Input() formConfig: FormConfig;
	
	constructor(private router: Router,
	            private authService: AuthService) {}
	
	cancel() {
		return this.router.navigateByUrl('/');
	};
	
	onSubmit() {
		console.log('arsch Puperz');
		console.log(this.formConfig.form.value);
	}
	
	ngOnInit(): void {
	}
}