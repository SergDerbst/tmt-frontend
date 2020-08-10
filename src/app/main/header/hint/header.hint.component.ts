import {Component, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../_store/state/app.state";
import {selectGlobalHintMessageKey} from "../_store/header.selectors";
import {NavigationEnd, Router} from "@angular/router";
import {UpdateHintFromUrlAction} from "../_store/header.actions";

@Component({
	selector: 'tmt-header-hint',
	templateUrl: './header.hint.component.html',
	styleUrls: ['./header.hint.component.scss']
})
export class HeaderHintComponent implements OnInit {
	hintKey = this.store.pipe(select(selectGlobalHintMessageKey));
	
	constructor(public translate: TranslateService,
	            private router: Router,
	            private store: Store<AppState>) {
	}
	
	ngOnInit(): void {
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				let action = new UpdateHintFromUrlAction({ url: this.router.url });
				this.store.dispatch(action);
			}
		});
	}
	
}