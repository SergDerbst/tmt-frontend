import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {FormGroupConfig} from "../../../../_utils/form/config/form.config";
import {TranslateService} from "@ngx-translate/core";
import {FormControl} from "@angular/forms";
import {isEnter} from "../../../../_utils/keyboard/keys";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {VideoData} from "../../video.data";
import {DateFormatMap} from "../../../../_utils/data/date.and.time";
import {AppConfigService} from "../../../../app.config.service";
import {select, Store} from "@ngrx/store";
import {videoState} from "../../_store/video.selectors";
import {filter, map} from "rxjs/operators";
import {VideoState} from "../../_store/video.state";

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
	            private store: Store,
	            private appConfigService: AppConfigService) {
	}
	
	ngOnInit(): void {
		this.store.pipe(
			select(videoState),
			filter((videoState: VideoState) => videoState.video !== undefined),
			map(videoState => videoState.video),
			filter(video => video.header.domain === undefined),
		).subscribe((video) => {
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
		if (isEnter(event.keyCode)) {
			this.edit.title = !this.edit.title;
		}
	}
}