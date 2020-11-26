import {Component, Input, OnInit} from "@angular/core";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {TranslateService} from "@ngx-translate/core";
import {ContentFilterState} from "../../_store/content.state";
import {ContentPatchbay} from "../../content.patchbay";
import {ContentType} from "../../../_utils/data/enums";

@Component({
	selector: 'tmt-content-filter',
	templateUrl: './content.filter.component.html',
	styleUrls: ['./content.filter.component.scss'],
	styles: [':host { display: block; width: 100% }']
})
export class ContentFilterComponent implements OnInit {
	@Input() contentType: ContentType;
	filterState: ContentFilterState
	selectedContentType: string;
	faPlus = faPlus;
	
	constructor(public translate: TranslateService,
	            private pbay: ContentPatchbay) {}
	
	ngOnInit(): void {
		this.pbay.store().filterState$().subscribe(filterState => {
			this.filterState = filterState;
		});
	}
	
	createContent() {
		this.pbay.route().createContent(this.contentType);
	}
	
	selectFilter(index: number) {
		this.pbay.store().setFilter(index);
	}
}