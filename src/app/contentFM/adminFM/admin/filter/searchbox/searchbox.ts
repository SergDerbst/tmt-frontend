import {Component, Input, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {ContentFilterState} from "../../../_store/admin.state";

@Component({
	selector: 'tmt-searchbox',
	templateUrl: './searchbox.html',
	styleUrls: ['./searchbox.scss']
})
export class Searchbox implements OnInit {
	@Input() filterConfig: ContentFilterState;
	
	constructor(public translate: TranslateService) {
	}
	
	ngOnInit(): void {
	}
}