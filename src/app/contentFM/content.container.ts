import {Component, OnInit} from "@angular/core";
import {ContentPatchbay} from "./content.patchbay";
import {ContentAdminState} from "./_store/content.state";
import {Observable} from "rxjs";

@Component({
	selector: 'tmt-content-container',
	templateUrl: 'content.container.html'
})
export class ContentContainer implements OnInit {
	adminState$: Observable<ContentAdminState>;
	
	constructor(private readonly pbay: ContentPatchbay) {}
	
	ngOnInit(): void {
		this.adminState$ = this.pbay.store().adminState$();
	}
	
	selectContentType(index) {
		this.pbay.store().setContentType(index);
	}
}