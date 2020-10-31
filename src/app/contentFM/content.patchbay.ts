import {
	AuthSocket,
	DataSocket,
	ErrorSocket,
	Patchbay,
	LogicSocket,
	RouteSocket,
	StoreSocket
} from "../_patchbay/patchbay";
import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {selectContentAdminState, selectContentFilterState} from "./_store/content.selector";
import {ContentSelectContentFilterAction, ContentSelectContentTypeAction} from "./_store/content.actions";
import {defer, Observable, of} from "rxjs";
import {ContentAdminState, ContentFilterState} from "./_store/content.state";
import {Router} from "@angular/router";
import {ContentType} from "../_utils/data/enums";

export interface ContentAuthJunction extends AuthSocket {}
export interface ContentDataJunction extends DataSocket {}
export interface ContentErrorJunction extends ErrorSocket {}
export interface ContentLogicJunction extends LogicSocket {}
export interface ContentRouteJunction extends RouteSocket {
	createContent: (contentType: ContentType) => Observable<boolean>;
}
export interface ContentStoreJunction extends StoreSocket {
	adminState$: () => Observable<ContentAdminState>,
	filterState$: () => Observable<ContentFilterState>,
	setContentType: (index: number) => Observable<void>,
	setFilter: (index: number) => Observable<void>,
}

@Injectable()
export class ContentPatchbay extends Patchbay<
	ContentAuthJunction,
	ContentDataJunction,
	ContentErrorJunction,
	ContentLogicJunction,
	ContentRouteJunction,
	ContentStoreJunction> {
	constructor(private readonly redux: Store,
	            private readonly router: Router) {
		super();
		this.route({
			createContent: (contentType: ContentType) => defer(() => this.router.navigateByUrl('/content/' + contentType + '/create')),
		});
		this.store({
			adminState$: () => this.redux.pipe(select(selectContentAdminState)),
			filterState$: () => this.redux.pipe(select(selectContentFilterState)),
			setContentType: (index: number) => of(this.redux.dispatch(new ContentSelectContentTypeAction({ index: index }))),
			setFilter: (index: number) => of(this.redux.dispatch(new ContentSelectContentFilterAction({ index: index }))),
		});
	}
}
