import {Component, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {VideoData, VideoMetadata} from "../video.data";
import {VideoService} from "../video.service";
import {ContentStatus} from "../../../_utils/data/enums";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {FormConfig, FormControlConfig, FormGroupConfig} from "../../../_utils/form/config/form.config";
import {FormControlValidationService} from "../../../_utils/form/validation/form.control.validation.service";

const updateOnBlur = { updateOn: 'blur' };

@Component({
	selector: 'tmt-video-edit',
	templateUrl: './video.edit.component.html',
	styleUrls: ['./video.edit.component.scss']
})
export class VideoEditComponent implements OnInit {
	video: VideoData;
	formConfig: FormConfig;
	onSubmit: () => void;
	groups: {
		header: FormGroupConfig,
		metadata: FormGroupConfig,
		transcript: FormGroupConfig
	};
	
	constructor(public translate: TranslateService,
	            private route: ActivatedRoute,
	            private fb: FormBuilder,
	            private validation: FormControlValidationService,
	            private videoService: VideoService) {
		translate.addLangs(['de', 'en']);
		translate.setDefaultLang('en');
	}
	
	ngOnInit(): void {
		this.prepareForm();
		this.loadData();
	}
	
	private loadData() {
		this.route.params.subscribe(params => {
			this.videoService.getVideo(params['id']).subscribe(video => {
				if (video.header.status === ContentStatus.Created) {
					video.header.status = ContentStatus.InProcess;
				}
				this.activateController(video, 'header', 'title');
				this.activateController(video, 'metadata', 'description');
			});
		});
	}
	
	private activateController(video: VideoData, groupName: string, controlName: string) {
		let control = (<FormGroup>this.formConfig.form.controls[groupName]).controls[controlName];
		control.setValue(video[groupName][controlName]);
		control.valueChanges.subscribe(value => {
			video[groupName][controlName] = value;
			//TODO update location hint 'saving video...'
			this.videoService.updateVideo(this.video).subscribe(() => {
				//TODO update location hint 'video saved'
			});
		});
	}
	
	private prepareForm() {
		this.groups = {
			header: this.header(),
			metadata: this.metadata(),
			transcript: this.transcript()
		};
		
		this.formConfig = new FormConfig(this.fb.group({
			header: this.groups.header.formGroup,
			metadata: this.groups.metadata.formGroup,
			transcript: this.groups.transcript //TODO transcription magic motherfucker
		}), (): void => {
			this.videoService.updateVideo(this.formConfig.form.value).subscribe(video => {
				//TODO what ever you wanna do, bitch
			});
		}).setGroups([
			this.groups.header, this.groups.metadata, this.groups.transcript
		]);
		this.onSubmit = this.formConfig.submit;
	}
	
	private header() {
		let mainForm = new FormGroupConfig(this.fb.group({
			title: ['', updateOnBlur]
		}));
		mainForm.setControls([
			new FormControlConfig(<FormControl> mainForm.formGroup.controls.title)
		]);
		let title = mainForm.formGroup.get('title');
		this.validation.prepare(title)
			.required()
			.maxLength(100)
			.compose();
		title.valueChanges.subscribe(value => {
			//TODO set value on video and save the bitch
		});
		return mainForm;
	}
	
	private metadata() {
		let metadataForm = new FormGroupConfig(this.fb.group({
			description: ['', updateOnBlur]
		})).setConfiguration({
			name: 'metadata',
			edit: { description: false },
			visible: false
		});
		metadataForm.setControls([
			new FormControlConfig(<FormControl> metadataForm.formGroup.controls.description).setConfiguration({
				name: 'description',
				type: 'textbox'
			})
		]);
		let description = metadataForm.formGroup.get('description');
		this.validation.prepare(description)
			.required()
			.maxLength(1000)
			.compose();
		description.valueChanges.subscribe(value => {
			//TODO set value on video and save the bitch
		});
		return metadataForm;
	}
	
	private transcript() {
		let transcript = new FormGroupConfig(this.fb.group({
			//TODO add super-fancy transcript controls
		}));
		return transcript;
	}
}