import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {ContentTypeState, ContentFilterState} from "./_store/admin.state";
import {ContentType} from "../../_utils/data/enums";
import {AdminPatchbay} from "./admin.patchbay";

@Component({
	selector: 'tmt-admin-container',
	templateUrl: 'admin.container.html'
})
export class AdminContainer implements OnInit {
	contentTypeState$: Observable<ContentTypeState>;
	contentFilterState$: Observable<ContentFilterState>;
	
	constructor(private readonly pbay: AdminPatchbay) {}
	
	ngOnInit(): void {
		this.contentTypeState$ = this.pbay.store().contentTypeState$();
		this.contentFilterState$ = this.pbay.store().contentFilterState$();
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
