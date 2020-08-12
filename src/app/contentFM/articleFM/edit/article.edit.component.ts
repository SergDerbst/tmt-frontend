import {AfterViewInit, Component, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Component({
	selector: 'tmt-article-edit',
	templateUrl: './article.edit.component.html',
	styleUrls: ['./article.edit.component.scss']
})
export class ArticleEditComponent implements OnInit, AfterViewInit {
	
	constructor(public translate: TranslateService) {
	}
	
	ngAfterViewInit(): void {
	}
	
	ngOnInit(): void {
	}
}