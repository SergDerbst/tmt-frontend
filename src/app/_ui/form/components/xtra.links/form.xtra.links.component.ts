import {Component, Input} from "@angular/core";
import {SortService} from "../../../../_utils/sort/sort.service";
import {FormElementLink} from "../../elements/form.element.link";

@Component({
	selector: 'tmt-form-xtra-links',
	templateUrl: './form.xtra.links.component.html',
	styleUrls: ['./form.xtra.links.component.scss']
})
export class FormXtraLinksComponent {
	@Input() formId: string;
	@Input() links: FormElementLink[];
	
	constructor(private sortService: SortService) {
	}
	
	designatedOrder = this.sortService.designatedOrder;
}