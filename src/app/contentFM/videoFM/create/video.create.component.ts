import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {ValidationRegexMap} from "../../../_utils/form/validation/validation.regex.map";
import {isEnter} from "../../../_utils/keyboard/keys";
import {VideoService} from "../video.service";
import {Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {selectVideoState} from "../_store/video.selectors";
import {VideoState} from "../_store/video.state";

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
	            private router: Router,
	            private store: Store,
	            private videoService: VideoService) {}
	
	ngAfterViewInit(): void {
		this.focusElement.nativeElement.focus();
	}
	
	ngOnInit(): void {
		this.store.pipe(select(selectVideoState)).subscribe((videoState) => {
			this.videoState = videoState;
		});
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
		if(isEnter(event.keyCode) && this.form.valid) {
			this.createVideo();
		}
	}
	
	createVideo() {
		this.videoService.createVideo(this.form.value)
			.subscribe(
				data => {
				return this.router.navigateByUrl('content/video/' + data.header.id + '/edit', {
					state: { data: data }
				});
			});
	}
}