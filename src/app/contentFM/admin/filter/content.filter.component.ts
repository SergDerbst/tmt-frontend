import {Component, OnInit} from "@angular/core";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {selectContentFilterState} from "../../_store/content.selector";
import {ContentSelectContentFilterAction} from "../../_store/content.actions";
import {ContentFilterState} from "../../_store/content.state";

@Component({
	selector: 'tmt-content-filter',
	templateUrl: './content.filter.component.html',
	styleUrls: ['./content.filter.component.scss'],
	styles: [':host { display: block; width: 100% }']
})
export class ContentFilterComponent implements OnInit {
	filterConfig: ContentFilterState
	selectedContentType: string;
	faPlus = faPlus;
	
	constructor(public translate: TranslateService,
	            private router: Router,
	            private store: Store) {}
	
	ngOnInit(): void {
		this.store.pipe(select(selectContentFilterState)).subscribe(filterState => {
			this.filterConfig = filterState;
		});
	}
	
	createContent() {
		return this.router.navigateByUrl('/content/' + this.filterConfig.contentType + '/create');
	}
	
	selectFilter(index: number) {
		this.store.dispatch(new ContentSelectContentFilterAction({ index: index }));
	}
}