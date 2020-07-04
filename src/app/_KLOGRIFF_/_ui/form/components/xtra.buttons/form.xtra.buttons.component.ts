import {AfterViewInit, Component, Input, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {SortService} from "../../../../../utils/sort/sort.service";
import {FormConfig} from "../../config/form.config";

@Component({
	selector: 'tmt-form-xtra-buttons',
	templateUrl: './form.xtra.buttons.component.html',
	styleUrls: ['./form.xtra.buttons.component.scss']
})
export class FormXtraButtonsComponent implements OnInit, AfterViewInit {
	@Input() form: FormGroup;
	@Input() formConfig: FormConfig;
	
	constructor(private sortService: SortService) {}
	
	ngOnInit(): void {
	}
	
	ngAfterViewInit(): void {
	}
	
	designatedOrder = this.sortService.designatedOrder;
}