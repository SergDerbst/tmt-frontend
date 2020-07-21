import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {FormGroupConfig} from "../../../../_utils/form/config/form.config";
import {TranslateService} from "@ngx-translate/core";
import {FormControl} from "@angular/forms";
import {isEnter} from "../../../../_utils/keyboard/keys";
import {faCheck, faPen, faUser} from "@fortawesome/free-solid-svg-icons";
import {VideoData} from "../../video.data";
import {DateFormatMap} from "../../../../_utils/data/date.and.time";
import {AppConfigService} from "../../../../app.config.service";

@Component({
	selector: 'tmt-video-header',
	templateUrl: './video.header.component.html',
	styleUrls: ['./video.header.component.scss']
})
export class VideoHeaderComponent implements OnInit {
	@Input() header: FormGroupConfig;
	@Input() formId: string;
	@Input() video: VideoData;
	@ViewChild('titleSegment') titleSegment;
	title: FormControl;
	edit: { title: boolean };
	dateFormat: string;
	faUser = faUser;
	
	constructor(public translate: TranslateService,
	            private appConfigService: AppConfigService) {
		translate.addLangs(['de', 'en']);
		translate.setDefaultLang('en');
	}
	
	ngOnInit(): void {
		this.edit = { title: false };
		this.title = <FormControl><unknown>this.header.controls[0].control;
		this.dateFormat = new DateFormatMap().get(this.appConfigService.appLanguage()).format;
	}
	
	handleTitleFocus() {
		this.titleSegment.nativeElement.querySelector('#title').select();
	}
	
	keyEvent(event: KeyboardEvent) {
		if (isEnter(event.keyCode)) {
			this.edit.title = !this.edit.title;
		}
	}
}