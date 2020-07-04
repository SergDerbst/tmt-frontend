import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {ValidationRegExMap} from "../../_KLOGRIFF_/_ui/form/config/controls/validation/validation.reg.ex.map";
import {isEnter} from "../../_KLOGRIFF_/_ui/keyboard/keys";

@Component({
	selector: 'tmt-video-create',
	templateUrl: './content.video.create.component.html',
	styleUrls: ['./content.video.create.component.scss']
})
export class ContentVideoCreateComponent implements OnInit, AfterViewInit {
	@ViewChild('focusElement') focusElement;
	mainForm: FormGroup;
	faPlus = faPlus;
	
	constructor(private fb: FormBuilder,
	            public translate: TranslateService) {
		translate.addLangs(['de', 'en']);
		translate.setDefaultLang('en');
	}
	
	ngAfterViewInit(): void {
		this.focusElement.nativeElement.focus();
	}
	
	ngOnInit(): void {
		this.mainForm = this.fb.group({
			title: new FormControl('', [
				Validators.required
			]),
			url: new FormControl('', [
				Validators.required,
				Validators.pattern(new ValidationRegExMap().get('url'))
			])
		});
	}
	
	handleKeyEvent(event) {
		if(isEnter(event.keyCode) && this.mainForm.valid) {
			this.createVideo();
		}
	}
	
	createVideo() {
	
	}
}