import {AfterViewInit, Component, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Component({
	selector: 'tmt-video-view',
	templateUrl: './content.video.edit.component.html',
	styleUrls: ['./content.video.view.component.scss']
})
export class ContentVideoViewComponent implements OnInit, AfterViewInit {
	
	constructor(public translate: TranslateService) {
		translate.addLangs(['de', 'en']);
		translate.setDefaultLang('en');
	}
	
	ngAfterViewInit(): void {
	}
	
	ngOnInit(): void {
	}
}