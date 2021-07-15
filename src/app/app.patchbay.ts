import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {Event, Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {AuthService} from "./authFM/auth.service";
import {UpdateHintFromUrlAction} from "./main/header/_store/header.actions";
import {selectGlobalHintMessageKey} from "./main/header/_store/header.selectors";
import {AuthSocket, DataSocket, ErrorSocket, LogicSocket, Patchbay, RouteSocket, StoreSocket} from "patchbay/dist";

export interface AppAuthJunction extends AuthSocket {
	userName$: () => Observable<string>;
	isAuthenticated$: () => Observable<boolean>;
}
export interface AppDataJunction extends DataSocket {}
export interface AppErrorJunction extends ErrorSocket {}
export interface AppLogicJunction extends LogicSocket {}
export interface AppRouteJunction extends RouteSocket {
	events$: () => Observable<Event>;
}
export interface AppStoreJunction extends StoreSocket {
	hintKey$: () => Observable<string>,
	updateHintFromUrl: () => Observable<void>,
}

@Injectable()
export class AppPatchbay extends Patchbay<
	AppAuthJunction,
	AppDataJunction,
	AppErrorJunction,
	AppLogicJunction,
	AppRouteJunction,
	AppStoreJunction> {
	constructor(private readonly authService: AuthService,
	            private readonly redux: Store,
	            private readonly router: Router) {
		super();
		this.auth({
			userName$: () => of(localStorage.getItem('tmt-username')),
			isAuthenticated$: () => of(this.authService.isAuthenticated()),
		});
		this.route({
			events$: () => this.router.events,
		});
		this.store({
			hintKey$: () => this.redux.pipe(select(selectGlobalHintMessageKey)),
			updateHintFromUrl: () => of(this.redux.dispatch(new UpdateHintFromUrlAction({ url: this.router.url }))),
		});
	}
}