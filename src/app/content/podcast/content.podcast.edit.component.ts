import {AfterViewInit, Component, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Component({
	selector: 'tmt-podcast-edit',
	templateUrl: './content.podcast.edit.component.html',
	styleUrls: ['./content.podcast.edit.component.scss']
})
export class ContentPodcastEditComponent implements OnInit, AfterViewInit {
	
	constructor(public translate: TranslateService) {
		translate.addLangs(['de', 'en']);
		translate.setDefaultLang('en');
	}
	
	ngAfterViewInit(): void {
	}
	
	ngOnInit(): void {
	}
}