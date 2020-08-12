import {AfterViewInit, Component, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Component({
	selector: 'tmt-article-view',
	templateUrl: './article.view.component.html',
	styleUrls: ['./article.view.component.scss']
})
export class ArticleViewComponent implements OnInit, AfterViewInit {
	
	constructor(public translate: TranslateService) {}
	
	ngAfterViewInit(): void {
	}
	
	ngOnInit(): void {
	}
}