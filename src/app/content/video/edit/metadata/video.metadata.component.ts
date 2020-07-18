import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {FormGroupConfig} from "../../../../_utils/form/config/form.config";
import {FormControl} from "@angular/forms";
import {VideoData} from "../../video.data";

@Component({
	selector: 'tmt-video-metadata',
	templateUrl: './video.metadata.component.html',
	styleUrls: ['./video.metadata.component.scss']
})
export class VideoMetadataComponent implements OnInit {
	@Input() metadata: FormGroupConfig;
	@Input() video: VideoData;
	@ViewChild('editButton') editButton;
	description: FormControl;
	edit: { metadata: boolean };
	
	constructor(public translate: TranslateService) {
		translate.addLangs(['de', 'en']);
		translate.setDefaultLang('en');
	}
	
	ngOnInit(): void {
		this.edit = { metadata: false};
		console.log('arsch bubu lutsch');
		console.log(this.video);
	}
}