import {Injectable} from "@angular/core";
import {Patchbay} from "../../_patchbay/patchbay";
import {
	AdminAuthSocket,
	AdminDataSocket,
	AdminErrorSocket,
	AdminLogicSocket,
	AdminRoutSocket,
	AdminStoreSocket
} from "./admin.sockets";
import {select, Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {ContentType} from "../../_utils/data/enums";
import {of} from "rxjs";
import {selectContentTypeState, selectContentFilterState} from "./_store/admin.selector";
import {ContentSelectContentFilterAction, ContentSelectContentTypeAction} from "./_store/admin.actions";

@Injectable()
export class AdminPatchbay extends Patchbay<
	AdminAuthSocket,
	AdminDataSocket,
	AdminErrorSocket,
	AdminLogicSocket,
	AdminRoutSocket,
	AdminStoreSocket> {
	constructor(private readonly redux: Store,
	            private readonly router: Router) {
		super();
		this.routeSocket();
		this.storeSocket();
	}
	
	private routeSocket() {
		this.route({
			createContent: (contentType: ContentType) => {
				this.router.navigateByUrl('/content/' + contentType + '/create');
				return of(true);
			},
		});
	}
	
	private storeSocket() {
		this.store({
			contentTypeState$: () => this.redux.pipe(select(selectContentTypeState)),
			contentFilterState$: () => this.redux.pipe(select(selectContentFilterState)),
			setContentType: (index: number) => of(this.redux.dispatch(new ContentSelectContentTypeAction({index: index}))),
			setFilter: (index: number) => of(this.redux.dispatch(new ContentSelectContentFilterAction({index: index}))),
		});
	}
}