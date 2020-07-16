import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {ValidationRegexMap} from "../../_utils/form/validation/validation.regex.map";
import {isEnter} from "../../_utils/keyboard/keys";
import {VideoService} from "./video.service";
import {Router} from "@angular/router";

@Component({
	selector: 'tmt-video-create',
	templateUrl: './content.video.create.component.html',
	styleUrls: ['./content.video.create.component.scss']
})
export class ContentVideoCreateComponent implements OnInit, AfterViewInit {
	@ViewChild('focusElement') focusElement;
	form: FormGroup;
	faPlus = faPlus;
	
	constructor(public translate: TranslateService,
	            private fb: FormBuilder,
	            private router: Router,
	            private videoService: VideoService) {
		translate.addLangs(['de', 'en']);
		translate.setDefaultLang('en');
	}
	
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
		if(isEnter(event.keyCode) && this.form.valid) {
			this.createVideo();
		}
	}
	
	createVideo() {
		this.videoService.createVideo(this.form.value)
			.subscribe(
				data => {
				return this.router.navigateByUrl('content/video/edit', {
					state: { data: data }
				});
			});
	}
}