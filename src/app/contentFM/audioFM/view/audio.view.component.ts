import {AfterViewInit, Component, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Component({
	selector: 'tmt-audio-view',
	templateUrl: './audio.view.component.html',
	styleUrls: ['./audio.view.component.scss']
})
export class AudioViewComponent implements OnInit, AfterViewInit {
	
	constructor(public translate: TranslateService) {
	}
	
	ngAfterViewInit(): void {
	}
	
	ngOnInit(): void {
	}
	
}