import {AfterViewInit, Component, OnInit} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";

@Component({
	selector: 'tmt-article-create',
	templateUrl: './content.article.create.component.html',
	styleUrls: ['./content.article.create.component.scss']
})
export class ContentArticleCreateComponent implements OnInit, AfterViewInit {
	
	constructor(private fb: FormBuilder,
	            public translate: TranslateService) {
	}
	
	ngAfterViewInit(): void {
	}
	
	ngOnInit(): void {
	}
}