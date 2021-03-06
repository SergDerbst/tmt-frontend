import {Component, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {NavigationEnd} from "@angular/router";
import {AppPatchbay} from "../../../app.patchbay";
import {Observable} from "rxjs";

@Component({
	selector: 'tmt-header-hint',
	templateUrl: './header.hint.component.html',
	styleUrls: ['./header.hint.component.scss']
})
export class HeaderHintComponent implements OnInit {
	hintKey: Observable<string>;
	
	constructor(public translate: TranslateService,
	            private jBox: AppPatchbay) {
	}
	
	ngOnInit(): void {
		this.hintKey = this.jBox.store().hintKey$();
		this.jBox.route().events$().subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.jBox.store().updateHintFromUrl();
			}
		});
	}
}