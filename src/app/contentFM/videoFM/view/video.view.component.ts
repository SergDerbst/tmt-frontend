import {AfterViewInit, Component, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Component({
	selector: 'tmt-video-view',
	templateUrl: './video.view.component.html',
	styleUrls: ['./video.view.component.scss']
})
export class VideoViewComponent implements OnInit, AfterViewInit {
	
	constructor(public translate: TranslateService) {
	}
	
	ngAfterViewInit(): void {
	}
	
	ngOnInit(): void {
	}
}