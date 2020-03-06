import {AfterViewInit, Component, Input, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {SortService} from "../../../../_utils/sort/sort.service";

@Component({
	selector: 'tmt-form-xtra-buttons',
	templateUrl: './form.xtra.buttons.component.html',
	styleUrls: ['./form.xtra.buttons.component.scss']
})
export class FormXtraButtonsComponent implements OnInit, AfterViewInit {
	@Input() buttons: [];
	@Input() form: FormGroup;
	
	constructor(private sortService: SortService) {}
	
	ngOnInit(): void {
	}
	
	ngAfterViewInit(): void {
		console.log('component initialized: ' + 'arsch buttons');
	}
	
	designatedOrder = this.sortService.designatedOrder;
}