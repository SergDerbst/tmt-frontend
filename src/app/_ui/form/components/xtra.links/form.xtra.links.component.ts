import {AfterViewInit, Component, Input} from "@angular/core";
import {SortService} from "../../../../_utils/sort/sort.service";

@Component({
	selector: 'tmt-form-xtra-links',
	templateUrl: './form.xtra.links.component.html',
	styleUrls: ['./form.xtra.links.component.scss']
})
export class FormXtraLinksComponent implements AfterViewInit {
	@Input() formId: string;
	@Input() links: []
	
	constructor(private sortService: SortService) {
	}
	
	ngAfterViewInit(): void {
		console.log('component initialized: ' + 'arsch links');
	}
	
	designatedOrder = this.sortService.designatedOrder;
}