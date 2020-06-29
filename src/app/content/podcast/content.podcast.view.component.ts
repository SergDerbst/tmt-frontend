import {AfterViewInit, Component, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Component({
	selector: 'tmt-podcast-view',
	templateUrl: './content.podcast.view.component.html',
	styleUrls: ['./content.podcast.view.component.scss']
})
export class ContentPodcastViewComponent implements OnInit, AfterViewInit {
	
	constructor(public translate: TranslateService) {
		translate.addLangs(['de', 'en']);
		translate.setDefaultLang('en');
	}
	
	ngAfterViewInit(): void {
	}
	
	ngOnInit(): void {
	}
	
}