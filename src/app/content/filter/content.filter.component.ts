import {AfterViewInit, Component, Input, OnInit} from "@angular/core";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {ContentConfig} from "../content.config";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";

@Component({
	selector: 'tmt-content-filter',
	templateUrl: './content.filter.component.html',
	styleUrls: ['./content.filter.component.scss'],
	styles: [':host { display: block; width: 100% }']
})
export class ContentFilterComponent implements OnInit, AfterViewInit {
	@Input() contentConfig: ContentConfig
	faPlus = faPlus;
	
	constructor(public translate: TranslateService,
	            private router: Router) {
		translate.addLangs(['de', 'en']);
		translate.setDefaultLang('en');
	}
	
	ngAfterViewInit(): void {
	}
	
	ngOnInit(): void {
	}
	
	createContent() {
		return this.router.navigateByUrl('/content/' + this.contentConfig.selectedType + '/create');
	}
	
	selectFilter(index: number) {
		this.contentConfig.selectedFilter = this.contentConfig.contentFilters[index];
		this.contentConfig.searchboxConfig.contentFilter = this.contentConfig.contentFilters[index];
	}
}