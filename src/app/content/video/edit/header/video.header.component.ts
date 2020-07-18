import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {FormGroupConfig} from "../../../../_utils/form/config/form.config";
import {TranslateService} from "@ngx-translate/core";
import {FormControl} from "@angular/forms";
import {isEnter} from "../../../../_utils/keyboard/keys";
import {faCheck, faPen} from "@fortawesome/free-solid-svg-icons";

@Component({
	selector: 'tmt-video-header',
	templateUrl: './video.header.component.html',
	styleUrls: ['./video.header.component.scss']
})
export class VideoHeaderComponent implements OnInit {
	@Input() header: FormGroupConfig;
	@ViewChild('titleSegment') titleSegment;
	title: FormControl;
	edit: { title: boolean };
	
	constructor(public translate: TranslateService) {
		translate.addLangs(['de', 'en']);
		translate.setDefaultLang('en');
	}
	
	ngOnInit(): void {
		this.edit = { title: false };
		this.title = <FormControl><unknown>this.header.controls[0].control;
	}
	
	handleTitleFocus() {
		this.titleSegment.nativeElement.querySelector('#title').select();
	}
}