import {Component, Input, OnInit} from "@angular/core";
import {FormGroupConfig} from "../config/form.config";

@Component({
	selector: 'tmt-form-group',
	templateUrl: './form.group.component.html',
	styleUrls: ['./form.group.component.scss']
})
export class FormGroupComponent implements OnInit {
	@Input() formName: string;
	@Input() groupName: string;
	@Input() groupConfig: FormGroupConfig;
	
	ngOnInit(): void {
	}
}