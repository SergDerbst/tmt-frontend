import {Component, Input, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {FormGroupConfig} from "../../../../_utils/form/config/form.config";

@Component({
	selector: 'tmt-video-transcript',
	templateUrl: './video.transcript.component.html',
	styleUrls: ['./video.transcript.component.scss']
})
export class VideoTranscriptComponent implements OnInit {
	@Input() transcript: FormGroupConfig;
	
	constructor(public translate: TranslateService) {
		translate.addLangs(['de', 'en']);
		translate.setDefaultLang('en');
	}
	
	ngOnInit(): void {
	}
}