import {AuthSocket, DataSocket, ErrorSocket, LogicSocket, RouteSocket, StoreSocket} from "../_patchbay/patchbay";
import {ContentType} from "../_utils/data/enums";
import {Observable} from "rxjs";
import {ContentAdminState, ContentFilterState} from "./_store/content.state";

export interface ContentAuthSocket extends AuthSocket {}

export interface ContentDataSocket extends DataSocket {}

export interface ContentErrorSocket extends ErrorSocket {}

export interface ContentLogicSocket extends LogicSocket {}

export interface ContentRouteSocket extends RouteSocket {
	createContent: (contentType: ContentType) => Observable<boolean>;
}

export interface ContentStoreSocket extends StoreSocket {
	adminState$: () => Observable<ContentAdminState>,
	filterState$: () => Observable<ContentFilterState>,
	setContentType: (index: number) => Observable<void>,
	setFilter: (index: number) => Observable<void>,
}