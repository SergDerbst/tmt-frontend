import {Component, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {VideoData} from "../video.data";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {FormConfig, FormControlConfig, FormGroupConfig} from "../../../_utils/form/config/form.config";
import {FormControlValidationService} from "../../../_utils/form/validation/form.control.validation.service";
import {VideoJunctionBox} from "../video.junction.box";

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
	            private junctionBox: VideoJunctionBox,
	            private validation: FormControlValidationService) {
	}
	
	ngOnInit(): void {
		this.loadData();
	}
	
	private loadData() {
		this.junctionBox.route().params$().subscribe(params => {
			this.junctionBox.data().loadVideo$(params['id']);
			this.junctionBox.store().video$().subscribe((video: VideoData) => {
				this.video = video;
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
			this.junctionBox.logic().showHintVideoSaving();
			this.junctionBox.data().updateVideo$(this.video).subscribe((video) => {
				this.junctionBox.store(); //TODO put video
				this.junctionBox.logic().flashHintVideoSaved();
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
			//TODO add super-fancy transcript controls, no: do that in transcript module
		}));
		return transcript;
	}
}