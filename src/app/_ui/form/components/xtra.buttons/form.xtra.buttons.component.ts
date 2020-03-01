import {Component, Input, OnInit} from "@angular/core";
import {FormElementButton} from "../../elements/form.element.button";
import {FormGroup} from "@angular/forms";
import {SortService} from "../../../../_utils/sort/sort.service";

@Component({
	selector: 'tmt-form-xtra-buttons',
	templateUrl: './form.xtra.buttons.component.html',
	styleUrls: ['./form.xtra.buttons.component.scss']
})
export class FormXtraButtonsComponent implements OnInit {
	@Input() buttons: FormElementButton[];
	@Input() form: FormGroup;
	
	constructor(private sortService: SortService) {}
	
	ngOnInit(): void {
	}
	
	designatedOrder = this.sortService.designatedOrder;
}