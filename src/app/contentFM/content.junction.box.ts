import {
	AuthJunction,
	DataJunction,
	ErrorJunction,
	JunctionBox,
	LogicJunction,
	RouteJunction,
	StoreJunction
} from "../_junction/junction";
import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {selectContentAdminState, selectContentFilterState} from "./_store/content.selector";
import {ContentSelectContentFilterAction, ContentSelectContentTypeAction} from "./_store/content.actions";
import {defer, Observable, of} from "rxjs";
import {ContentAdminState, ContentFilterState} from "./_store/content.state";
import {Router} from "@angular/router";
import {ContentType} from "../_utils/data/enums";

export interface ContentAuthJunction extends AuthJunction {}
export interface ContentDataJunction extends DataJunction {}
export interface ContentErrorJunction extends ErrorJunction {}
export interface ContentLogicJunction extends LogicJunction {}
export interface ContentRouteJunction extends RouteJunction {
	createContent: (contentType: ContentType) => Observable<boolean>;
}
export interface ContentStoreJunction extends StoreJunction {
	adminState$: () => Observable<ContentAdminState>,
	filterState$: () => Observable<ContentFilterState>,
	setContentType: (index: number) => Observable<void>,
	setFilter: (index: number) => Observable<void>,
}

@Injectable()
export class ContentJunctionBox extends JunctionBox<
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
