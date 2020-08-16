import {Component, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {VideoData} from "../video.data";
import {VideoService} from "../video.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {FormConfig, FormControlConfig, FormGroupConfig} from "../../../_utils/form/config/form.config";
import {FormControlValidationService} from "../../../_utils/form/validation/form.control.validation.service";
import {Store} from "@ngrx/store";
import {FlashHintAction, ReplaceHintAction} from "../../../main/header/_store/header.actions";
import {VideoLoadAction} from "../_store/video.actions";
import {selectVideoState} from "../_store/video.selectors";
import {select} from "@ngrx/store";
import {VideoState} from "../_store/video.state";
import {filter} from "rxjs/operators";

const updateOnBlur = { updateOn: 'blur' };

@Component({
	selector: 'tmt-video-edit',
	templateUrl: './video.edit.component.html',
	styleUrls: ['./video.edit.component.scss']
})
export class VideoEditComponent implements OnInit {
	video: VideoData;
	
	videoFormConfig: FormConfig;
	groups: {
		header: FormGroupConfig,
		metadata: FormGroupConfig,
		transcript: FormGroupConfig
	};
	
	constructor(public translate: TranslateService,
	            private fb: FormBuilder,
	            private route: ActivatedRoute,
	            private router: Router,
	            private store: Store,
	            private validation: FormControlValidationService,
	            private videoService: VideoService) {
	}
	
	ngOnInit(): void {
		console.log('video edit');
		this.loadData();
	}
	
	private loadData() {
		this.route.params.subscribe(params => {
			this.store.dispatch(new VideoLoadAction({ videoId: params['id'] }));
			this.store.pipe(
				select(selectVideoState),
				filter((videoState: VideoState) => videoState.video !== undefined),
				filter((videoState: VideoState) => videoState.video.header.domain === undefined)
			).subscribe((videoState: VideoState) => {
				this.video = videoState.video;
				this.prepareForm();
				this.activateController(this.video, 'header', 'title');
				this.activateController(this.video, 'metadata', 'description');
			});
		});
	}
	
	private activateController(video: VideoData, groupName: string, controlName: string) {
		let control = (<FormGroup>this.videoFormConfig.form.controls[groupName]).controls[controlName];
		control.setValue(video[groupName][controlName]);
		control.valueChanges.subscribe(value => {
			this.video[groupName][controlName] = value;
			this.showVideoSavingHint();
			this.videoService.updateVideo(this.video).subscribe(() => {
				this.flashVideoSavedHint();
			});
		});
	}
	
	private prepareForm() {
		this.groups = {
			header: this.prepareHeader(),
			metadata: this.prepareMetadata(),
			transcript: this.prepareTranscript()
		};
		
		this.videoFormConfig = new FormConfig(this.fb.group({
			header: this.groups.header.formGroup,
			metadata: this.groups.metadata.formGroup,
			transcript: this.groups.transcript.formGroup
		})).setGroups([
			this.groups.header, this.groups.metadata, this.groups.transcript
		]);
	}
	
	private prepareHeader() {
		let header = new FormGroupConfig(this.fb.group({
			title: ['', updateOnBlur]
		}));
		header.setControls([
			new FormControlConfig(<FormControl> header.formGroup.controls.title)
		]);
		let title = header.formGroup.get('title');
		this.validation.prepare(title)
			.required()
			.maxLength(100)
			.compose();
		return header;
	}
	
	private prepareMetadata() {
		let metadata = new FormGroupConfig(this.fb.group({
			description: ['', updateOnBlur]
		})).setConfiguration({
			name: 'metadata',
			edit: { description: false },
			visible: false
		});
		metadata.setControls([
			new FormControlConfig(<FormControl> metadata.formGroup.controls.description).setConfiguration({
				name: 'description',
				type: 'textbox'
			})
		]);
		let description = metadata.formGroup.get('description');
		this.validation.prepare(description)
			.required()
			.maxLength(1000)
			.compose();
		return metadata;
	}
	
	private prepareTranscript() {
		let transcript = new FormGroupConfig(this.fb.group({
			//TODO add super-fancy transcript controls
		}));
		return transcript;
	}
	
	private flashVideoSavedHint() {
		this.store.dispatch(new FlashHintAction({messageKey: 'content.transcript.edit.saved'}));
	}
	
	private showVideoSavingHint() {
		this.store.dispatch(new ReplaceHintAction({messageKey: 'content.transcript.edit.saving'}))
	}
}