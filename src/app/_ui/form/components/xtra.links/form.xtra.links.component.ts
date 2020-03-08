import {AfterViewInit, Component, Input} from "@angular/core";
import {SortService} from "../../../../_utils/sort/sort.service";
import {FormGroup} from "@angular/forms";
import {FormConfig} from "../../config/form.config";

@Component({
	selector: 'tmt-form-xtra-links',
	templateUrl: './form.xtra.links.component.html',
	styleUrls: ['./form.xtra.links.component.scss']
})
export class FormXtraLinksComponent implements AfterViewInit {
	@Input() form: FormGroup;
	@Input() formConfig: FormConfig;
	
	constructor(private sortService: SortService) {
	}
	
	ngAfterViewInit(): void {
		console.log('component initialized: ' + 'arsch links');
	}
	
	designatedOrder = this.sortService.designatedOrder;
}