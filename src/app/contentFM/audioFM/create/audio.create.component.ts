import {AfterViewInit, Component, OnInit} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";

@Component({
	selector: 'tmt-audio-create',
	templateUrl: './audio.create.component.html',
	styleUrls: ['./audio.create.component.scss']
})
export class AudioCreateComponent implements OnInit, AfterViewInit {
	
	constructor(private fb: FormBuilder,
	            public translate: TranslateService) {
	}
	
	ngAfterViewInit(): void {
	}
	
	ngOnInit(): void {
	}
}