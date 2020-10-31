import {Patchbay} from "../_patchbay/patchbay";
import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {selectContentAdminState, selectContentFilterState} from "./_store/content.selector";
import {ContentSelectContentFilterAction, ContentSelectContentTypeAction} from "./_store/content.actions";
import {defer, of} from "rxjs";
import {Router} from "@angular/router";
import {ContentType} from "../_utils/data/enums";
import {
	ContentAuthSocket,
	ContentDataSocket,
	ContentErrorSocket,
	ContentLogicSocket,
	ContentRouteSocket,
	ContentStoreSocket
} from "./content.sockets";

@Injectable()
export class ContentPatchbay extends Patchbay<
	ContentAuthSocket,
	ContentDataSocket,
	ContentErrorSocket,
	ContentLogicSocket,
	ContentRouteSocket,
	ContentStoreSocket> {
	constructor(private readonly redux: Store,
	            private readonly router: Router) {
		super();
		
		this.routeSocket();
		this.storeSocket();
	}
	
	private routeSocket() {
		this.route({
			createContent: (contentType: ContentType) => defer(() => this.router.navigateByUrl('/content/' + contentType + '/create')),
		});
	}
	
	private storeSocket() {
		this.store({
			adminState$: () => this.redux.pipe(select(selectContentAdminState)),
			filterState$: () => this.redux.pipe(select(selectContentFilterState)),
			setContentType: (index: number) => of(this.redux.dispatch(new ContentSelectContentTypeAction({index: index}))),
			setFilter: (index: number) => of(this.redux.dispatch(new ContentSelectContentFilterAction({index: index}))),
		});
	}
}
