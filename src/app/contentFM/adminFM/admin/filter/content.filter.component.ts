import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {TranslateService} from "@ngx-translate/core";
import {ContentFilterState} from "../../_store/admin.state";
import {ContentType} from "../../../../_utils/data/enums";
import {Observable} from "rxjs";

@Component({
	selector: 'tmt-content-filter',
	templateUrl: './content.filter.component.html',
	styleUrls: ['./content.filter.component.scss'],
	styles: [':host { display: block; width: 100% }']
})
export class ContentFilterComponent implements OnInit {
	@Input() filterState$: Observable<ContentFilterState>;
	@Input() contentType: ContentType;
	@Output() contentCreate = new EventEmitter();
	@Output() contentFilterSelect = new EventEmitter();
	filterState: ContentFilterState
	faPlus = faPlus;
	
	constructor(public translate: TranslateService) {}
	
	ngOnInit(): void {
		this.filterState$.subscribe((filterState: ContentFilterState) => {
			this.filterState = filterState;
		});
	}
	
	createContent() {
		this.contentCreate.emit(this.contentType);
	}
	
	selectContentFilter(index: number) {
		this.contentFilterSelect.emit(index);
	}
}