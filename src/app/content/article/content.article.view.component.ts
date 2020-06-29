import {AfterViewInit, Component, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Component({
	selector: 'tmt-article-view',
	templateUrl: './content.article.view.component.html',
	styleUrls: ['./content.article.view.component.scss']
})
export class ContentArticleViewComponent implements OnInit, AfterViewInit {
	
	constructor(public translate: TranslateService) {
		translate.addLangs(['de', 'en']);
		translate.setDefaultLang('en');
	}
	
	ngAfterViewInit(): void {
	}
	
	ngOnInit(): void {
	}
}