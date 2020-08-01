import {Component, Input, OnInit} from "@angular/core";
import {faPlay, faPlus, faStepBackward, faStepForward} from "@fortawesome/free-solid-svg-icons";
import {TranslateService} from "@ngx-translate/core";
import {FormBuilder} from "@angular/forms";
import {FormControlValidationService} from "../../../../_utils/form/validation/form.control.validation.service";
import {Snippet} from "../../transcript.data";

@Component({
	selector: 'tmt-controls',
	templateUrl: './controls.html',
	styleUrls: ['./controls.scss']
})
export class Controls implements OnInit {
	@Input() snippet: Snippet;
	faPlus = faPlus;
	faStepBackward = faStepBackward;
	faPlay = faPlay;
	faStepForward = faStepForward;
	control: {
		loop: boolean
	}
	
	constructor(public translate: TranslateService) {
		translate.addLangs(['de', 'en']);
		translate.setDefaultLang('en');
	}
	
	ngOnInit(): void {
	}
	
	newSnippet() {
	
	}
	
	playSnippet() {
	
	}
	
	previousSnippet() {
	
	}
	
	nextSnippet() {
	
	}
	
	toggleLoop() {
		this.control.loop = !this.control.loop;
	}
}