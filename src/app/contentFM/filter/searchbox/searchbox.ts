import {AfterViewInit, Component, Input, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {SearchboxConfig} from "./searchbox.config";

@Component({
	selector: 'tmt-searchbox',
	templateUrl: './searchbox.html',
	styleUrls: ['./searchbox.scss']
})
export class Searchbox implements OnInit, AfterViewInit {
	@Input() searchBoxConfig: SearchboxConfig;
	
	constructor(public translate: TranslateService) {
	}
	
	ngAfterViewInit(): void {
	}
	
	ngOnInit(): void {
	
	}
}