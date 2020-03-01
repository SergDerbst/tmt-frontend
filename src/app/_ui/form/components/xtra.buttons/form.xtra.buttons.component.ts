import {Component, Input, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";

import {SortService} from "../../../../_utils/sort/sort.service";
import {FormElementButton} from "../../elements/form.element.button";

@Component({
	selector: 'tmt-form-xtra-buttons',
	templateUrl: './form.xtra.buttons.component.html',
	styleUrls: ['./form.xtra.buttons.component.scss']
})
export class FormXtraButtonsComponent implements OnInit {
	@Input() form: FormGroup;
	@Input() buttons: FormElementButton[];
	
	constructor(private sortService: SortService) {}
	
	ngOnInit(): void {
	}
	
	designatedOrder = this.sortService.designatedOrder;
}