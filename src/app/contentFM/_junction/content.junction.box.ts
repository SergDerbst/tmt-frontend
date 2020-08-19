import {Junction, JunctionBox} from "../../_junction/junction";
import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {selectContentAdminState, selectContentFilterState} from "../_store/content.selector";
import {ContentSelectContentFilterAction, ContentSelectContentTypeAction} from "../_store/content.actions";
import {defer, Observable, of} from "rxjs";
import {ContentAdminState, ContentFilterState} from "../_store/content.state";
import {Router} from "@angular/router";
import {ContentType} from "../../_utils/data/enums";

export interface ContentDataJunction extends Junction {}

export interface ContentLogicJunction extends Junction {}

export interface ContentRouterJunction extends Junction {
	createContent: (contentType: ContentType) => Observable<boolean>;
}

export interface ContentStoreJunction extends Junction {
	adminState$: () => Observable<ContentAdminState>,
	filterState$: () => Observable<ContentFilterState>,
	setContentType: (index: number) => Observable<void>,
	setFilter: (index: number) => Observable<void>,
}

@Injectable()
export class ContentJunctionBox extends JunctionBox<
	ContentDataJunction,
	ContentLogicJunction,
	ContentRouterJunction,
	ContentStoreJunction> {
	constructor(private router: Router,
	            private redux: Store) {
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
