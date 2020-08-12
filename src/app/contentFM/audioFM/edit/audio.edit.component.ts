import {AfterViewInit, Component, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Component({
	selector: 'tmt-audio-edit',
	templateUrl: './audio.edit.component.html',
	styleUrls: ['./audio.edit.component.scss']
})
export class AudioEditComponent implements OnInit, AfterViewInit {
	
	constructor(public translate: TranslateService) {}
	
	ngAfterViewInit(): void {
	}
	
	ngOnInit(): void {
	}
}