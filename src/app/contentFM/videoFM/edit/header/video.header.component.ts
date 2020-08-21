import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {FormGroupConfig} from "../../../../_utils/form/config/form.config";
import {TranslateService} from "@ngx-translate/core";
import {FormControl} from "@angular/forms";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {VideoData} from "../../video.data";
import {DateFormatMap} from "../../../../_utils/data/date.and.time";
import {AppConfigService} from "../../../../app.config.service";
import {VideoJunctionBox} from "../../video.junction.box";

@Component({
	selector: 'tmt-video-header',
	templateUrl: './video.header.component.html',
	styleUrls: ['./video.header.component.scss']
})
export class VideoHeaderComponent implements OnInit {
	@Input() header: FormGroupConfig;
	@Input() formId: string;
	@ViewChild('titleSegment') titleSegment;
	video: VideoData;
	title: FormControl;
	edit: { title: boolean };
	dateFormat: string;
	faUser = faUser;
	
	constructor(public translate: TranslateService,
	            private junctionBox: VideoJunctionBox,
	            private appConfigService: AppConfigService) {
	}
	
	ngOnInit(): void {
		this.junctionBox.store().video$().subscribe((video) => {
			this.video = video;
		});
		this.edit = { title: false };
		this.title = <FormControl><unknown>this.header.controls[0].control;
		this.dateFormat = new DateFormatMap().get(this.appConfigService.appLanguage()).format;
	}
	
	handleTitleFocus() {
		this.titleSegment.nativeElement.querySelector('#title').select();
	}
	
	keyEvent(event: KeyboardEvent) {
		this.junctionBox.keys().enter(event.keyCode, this.edit.title = !this.edit.title);
	}
}