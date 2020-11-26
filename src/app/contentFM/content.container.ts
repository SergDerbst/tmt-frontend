import {Component, OnInit} from "@angular/core";
import {ContentPatchbay} from "./content.patchbay";
import {ContentAdminState, ContentFilterState} from "./_store/content.state";
import {Observable} from "rxjs";
import {ContentType} from "../_utils/data/enums";

@Component({
	selector: 'tmt-content-container',
	templateUrl: 'content.container.html'
})
export class ContentContainer implements OnInit {
	adminState$: Observable<ContentAdminState>;
	filterState$: Observable<ContentFilterState>;
	
	constructor(private readonly pbay: ContentPatchbay) {}
	
	ngOnInit(): void {
		this.adminState$ = this.pbay.store().adminState$();
		this.filterState$ = this.pbay.store().filterState$();
	}
	
	createContent(contentType: ContentType) {
		this.pbay.route().createContent(contentType);
	}
	
	selectContentType(index) {
		this.pbay.store().setContentType(index);
	}
	
	selectContentFilter(index: number) {
		this.pbay.store().setFilter(index);
	}
}