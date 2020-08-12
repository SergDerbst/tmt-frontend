import {ChangeDetectorRef, Component, Input, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {Transcript} from "./transcript.data";
import {FormConfig, FormControlConfig, FormGroupConfig} from "../../_utils/form/config/form.config";
import {FormBuilder, FormControl} from "@angular/forms";
import {FormControlValidationService} from "../../_utils/form/validation/form.control.validation.service";
import {TranscriptKeyActions} from "./transcript.key.actions";
import {TranscriptService} from "./transcript.service";
import {TranscriptPlayer} from "./transcript.player";

@Component({
	selector: 'tmt-video-transcript',
	templateUrl: './transcript.component.html',
	styleUrls: ['./transcript.component.scss']
})
export class TranscriptComponent implements OnInit {
	@Input() transcript: Transcript;
	@Input() transcriptPlayer: TranscriptPlayer;
	@Input() formId: string;
	transcriptFormConfig: FormConfig;
	groups: {
		controls: FormGroupConfig,
		text: FormGroupConfig,
		properties: FormGroupConfig,
		comment: FormGroupConfig
	};
	control: {
		current: number
	};
	
	constructor(public translate: TranslateService,
	            public transcriptService: TranscriptService,
	            private fb: FormBuilder,
							private changeDetection: ChangeDetectorRef,
							private validation: FormControlValidationService,
							private transcriptKeyActions: TranscriptKeyActions) {
		this.control = { current: null };
	}
	
	ngOnInit(): void {
		this.groups = {
			controls: this.controls(),
			text: this.text(),
			properties: this.properties(),
			comment: this.comment(),
		};
		
		this.transcriptFormConfig = new FormConfig(this.fb.group({
			controls: this.groups.controls.formGroup,
			text: this.groups.text.formGroup,
			properties: this.groups.properties.formGroup,
			comment: this.groups.comment.formGroup,
		})).setGroups([
			this.groups.controls,
			this.groups.text,
			this.groups.properties,
			this.groups.comment
		]);
		this.transcriptKeyActions.prepareActions(this.transcriptPlayer);
		this.transcriptService.statusChanged.subscribe(value => {
			this.changeDetection.detectChanges();
		});
	}
	
	currentSnippet() {
		if (this.control.current === null) {
			return null;
		}
		return this.transcript.snippets[this.control.current];
	}
	
	/**
	 * Prepares the controls group.
	 */
	private controls() {
		let controls = new FormGroupConfig(this.fb.group({
			start: [''],
			end: [''],
		}));
		controls.setControls([
			new FormControlConfig(<FormControl> controls.formGroup.controls.start),
			new FormControlConfig(<FormControl> controls.formGroup.controls.end),
		])
		let start = controls.formGroup.get('start');
		let end = controls.formGroup.get('end');
		this.validation.prepare(start)
			.required()
			.compose();
		this.validation.prepare(end)
			.required()
			.compose();
		return controls;
	}
	
	/**
	 * Prepares the text group.
	 */
	private text() {
		let text = new FormGroupConfig(this.fb.group({
			text: [''],
		}));
		text.setControls([
			new FormControlConfig(<FormControl> text.formGroup.controls.text),
		]);
		let textControl = text.formGroup.get('text');
		this.validation.prepare(textControl)
			.required()
			.compose();
		return text;
	}
	
	/**
	 * Prepares the properties group.
	 */
	private properties() {
		let properties = new FormGroupConfig(this.fb.group({
			speaker: [''],
			color: [''],
			style: ['']
		}));
		properties.setControls([
			new FormControlConfig(<FormControl> properties.formGroup.controls.speaker),
			new FormControlConfig(<FormControl> properties.formGroup.controls.color),
			new FormControlConfig(<FormControl> properties.formGroup.controls.style),
		]);
		let speaker = properties.formGroup.get('speaker');
		let color = properties.formGroup.get('color');
		let style = properties.formGroup.get('style');
		this.validation.prepare(speaker)
			.required()
			.compose();
		this.validation.prepare(color)
			.hexColorCode()
			.compose();
		return properties;
	}
	
	/**
	 * Prepares the comment group.
	 */
	private comment() {
		let comment = new FormGroupConfig(this.fb.group({
			comment: [''],
		}));
		comment.setControls([
			new FormControlConfig(<FormControl> comment.formGroup.controls.text),
		]);
		return comment;
	}
}