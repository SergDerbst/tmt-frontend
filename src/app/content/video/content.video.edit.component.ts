import {AfterViewInit, Component, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
	selector: 'tmt-video-edit',
	templateUrl: './content.video.edit.component.html',
	styleUrls: ['./content.video.edit.component.scss']
})
export class ContentVideoEditComponent implements OnInit, AfterViewInit {
	mainForm: FormGroup;
	
	constructor(private fb: FormBuilder,
	            public translate: TranslateService) {
		translate.addLangs(['de', 'en']);
		translate.setDefaultLang('en');
	}
	
	ngAfterViewInit(): void {
	}
	
	ngOnInit(): void {
		this.mainForm = this.fb.group({
			title: new FormControl(''),
			url: new FormControl('')
		});
	}
}