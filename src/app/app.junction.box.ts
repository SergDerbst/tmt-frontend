import {
	AuthJunction,
	DataJunction,
	ErrorJunction,
	JunctionBox,
	LogicJunction,
	RouteJunction,
	StoreJunction
} from "./_junction/junction";
import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {Event, Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {AuthService} from "./authFM/auth.service";
import {UpdateHintFromUrlAction} from "./main/header/_store/header.actions";
import {selectGlobalHintMessageKey} from "./main/header/_store/header.selectors";

export interface AppAuthJunction extends AuthJunction {
	userName$: () => Observable<string>;
	isAuthenticated$: () => Observable<boolean>;
}
export interface AppDataJunction extends DataJunction {}
export interface AppErrorJunction extends ErrorJunction {}
export interface AppLogicJunction extends LogicJunction {}
export interface AppRouteJunction extends RouteJunction {
	events$: () => Observable<Event>;
}
export interface AppStoreJunction extends StoreJunction {
	hintKey$: () => Observable<string>,
	updateHintFromUrl: () => Observable<void>,
}

@Injectable()
export class AppJunctionBox extends JunctionBox<
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