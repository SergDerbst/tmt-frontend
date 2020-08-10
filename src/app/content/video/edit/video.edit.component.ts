import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {VideoData, VideoMetadata} from "../video.data";
import {VideoService} from "../video.service";
import {ContentStatus} from "../../../_utils/data/enums";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {FormConfig, FormControlConfig, FormGroupConfig} from "../../../_utils/form/config/form.config";
import {FormControlValidationService} from "../../../_utils/form/validation/form.control.validation.service";
import {Transcript} from "../../transcript/transcript.data";
import {Store} from "@ngrx/store";
import {AppState} from "../../../_store/state/app.state";
import {FlashHintAction, ReplaceHintAction, UpdateHintFromUrlAction} from "../../../main/header/_store/header.actions";

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
	            private store: Store<AppState>,
	            private validation: FormControlValidationService,
	            private videoService: VideoService) {
		translate.addLangs(['de', 'en']);
		translate.setDefaultLang('en');
	}
	
	ngOnInit(): void {
		this.prepareForm();
		this.loadData();
	}
	
	/**
	 * Loads the data.
	 */
	private loadData() {
		this.route.params.subscribe(params => {
			this.videoService.getVideo(params['id']).subscribe(video => {
				if (video.header.status === ContentStatus.Created) {
					video.header.status = ContentStatus.InProcess;
				}
				if (!video.transcript) {
					video.transcript = new Transcript();
				}
				this.video = video;
				this.activateController(video, 'header', 'title');
				this.activateController(video, 'metadata', 'description');
			});
		});
	}
	
	/**
	 * Activates the controller of the group with the given names, so that a value changes triggers
	 * the whole thing to be saved accordingly.
	 *
	 * @param video
	 * @param groupName
	 * @param controlName
	 */
	private activateController(video: VideoData, groupName: string, controlName: string) {
		let control = (<FormGroup>this.videoFormConfig.form.controls[groupName]).controls[controlName];
		control.setValue(video[groupName][controlName]);
		control.valueChanges.subscribe(value => {
			this.video[groupName][controlName] = value;
			this.showVideoSavingHint();
			//TODO SaveVideoAction with proper effects that dispatch further actions for flashing hints
			this.videoService.updateVideo(this.video).subscribe(() => {
				this.flashVideoSavedHint();
			});
		});
	}
	
	/**
	 * Prepares the form, bitch!
	 */
	private prepareForm() {
		this.groups = {
			header: this.header(),
			metadata: this.metadata(),
			transcript: this.transcript()
		};
		
		this.videoFormConfig = new FormConfig(this.fb.group({
			header: this.groups.header.formGroup,
			metadata: this.groups.metadata.formGroup,
			transcript: this.groups.transcript.formGroup
		})).setGroups([
			this.groups.header, this.groups.metadata, this.groups.transcript
		]);
	}
	
	/**
	 * Prepares the header group.
	 */
	private header() {
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
	
	/**
	 * Prepares the metadata group.
	 */
	private metadata() {
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
	
	/**
	 * Prepares the transcript group.
	 */
	private transcript() {
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