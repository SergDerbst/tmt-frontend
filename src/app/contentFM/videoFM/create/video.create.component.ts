import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {ValidationRegexMap} from "../../../_utils/form/validation/validation.regex.map";
import {VideoState} from "../_store/video.state";
import {VideoPatchbay} from "../video.patchbay";

@Component({
	selector: 'tmt-video-create',
	templateUrl: './video.create.component.html',
	styleUrls: ['./video.create.component.scss']
})
export class VideoCreateComponent implements OnInit, AfterViewInit {
	videoState: VideoState;
	@ViewChild('focusElement') focusElement;
	form: FormGroup;
	faPlus = faPlus;
	
	constructor(public translate: TranslateService,
	            private fb: FormBuilder,
	            private junctionBox: VideoPatchbay) {}
	
	ngAfterViewInit(): void {
		this.focusElement.nativeElement.focus();
	}
	
	ngOnInit(): void {
		this.form = this.fb.group({
			title: new FormControl('', [
				Validators.required
			]),
			url: new FormControl('', [
				Validators.required,
				Validators.pattern(new ValidationRegexMap().get('url'))
			])
		});
	}
	
	handleKeyEvent(event) {
		this.junctionBox.keys().enter(event.keyCode, this.createVideo);
	}
	
	createVideo() {
		this.junctionBox.data().createVideo$(this.form.value).subscribe(
			video => this.junctionBox.route().editVideo(video.header.id),
			error => this.junctionBox.error().videoCreation(error),
		);
	}
}