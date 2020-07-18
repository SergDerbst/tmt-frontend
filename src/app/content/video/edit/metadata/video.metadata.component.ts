import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {FormGroupConfig} from "../../../../_utils/form/config/form.config";
import {FormControl} from "@angular/forms";
import {faCheck, faPen} from "@fortawesome/free-solid-svg-icons";

@Component({
	selector: 'tmt-video-metadata',
	templateUrl: './video.metadata.component.html',
	styleUrls: ['./video.metadata.component.scss']
})
export class VideoMetadataComponent implements OnInit {
	@Input() metadata: FormGroupConfig;
	@ViewChild('editButton') editButton;
	title: FormControl;
	faCheck = faCheck;
	faPen = faPen;
	edit: { title: boolean };
	
	constructor(public translate: TranslateService) {
		translate.addLangs(['de', 'en']);
		translate.setDefaultLang('en');
	}
	
	ngOnInit(): void {
	}
}