import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {FormGroupConfig} from "../../../../_utils/form/config/form.config";
import {FormControl} from "@angular/forms";
import {VideoData} from "../../video.data";
import {select, Store} from "@ngrx/store";
import {selectVideoState} from "../../_store/video.selectors";
import {VideoState} from "../../_store/video.state";
import {filter, map} from "rxjs/operators";

@Component({
	selector: 'tmt-video-metadata',
	templateUrl: './video.metadata.component.html',
	styleUrls: ['./video.metadata.component.scss']
})
export class VideoMetadataComponent implements OnInit {
	@Input() metadata: FormGroupConfig;
	@Input() formId: string;
	@ViewChild('editButton') editButton;
	video: VideoData;
	description: FormControl;
	edit: { metadata: boolean };
	
	constructor(public translate: TranslateService,
	            private store: Store) {
	}
	
	ngOnInit(): void {
		this.store.pipe(
			select(selectVideoState),
			filter((videoState: VideoState) => videoState.video !== undefined),
			map(videoState => videoState.video),
			filter(video => video.header.domain === undefined),
		).subscribe((video) => {
			this.video = video;
		});
		this.edit = { metadata: false};
	}
}