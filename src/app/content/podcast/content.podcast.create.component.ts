import {AfterViewInit, Component, OnInit} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";

@Component({
	selector: 'tmt-podcast-create',
	templateUrl: './content.podcast.create.component.html',
	styleUrls: ['./content.podcast.create.component.scss']
})
export class ContentPodcastCreateComponent implements OnInit, AfterViewInit {
	
	constructor(private fb: FormBuilder,
	            public translate: TranslateService) {
		translate.addLangs(['de', 'en']);
		translate.setDefaultLang('en');
	}
	
	ngAfterViewInit(): void {
	}
	
	ngOnInit(): void {
	}
}