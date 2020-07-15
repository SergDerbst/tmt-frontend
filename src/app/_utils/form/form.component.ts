import {Component, Input, OnInit} from "@angular/core";
import {FormConfig} from "./config/form.config";
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {Observable} from "rxjs";

@Component({
	selector: 'tmt-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
	@Input() formName: string;
	@Input() formConfig: FormConfig;
	onSubmit: () => void;
	
	constructor(private router: Router) {}
	
	cancel() {
		return this.router.navigateByUrl('/');
	};
	
	ngOnInit(): void {
		this.onSubmit = this.formConfig.submit;
	}
}