import {AuthSocket, DataSocket, ErrorSocket, LogicSocket, RouteSocket, StoreSocket} from "../../_patchbay/patchbay";
import {ContentType} from "../../_utils/data/enums";
import {Observable} from "rxjs";
import {ContentTypeState, ContentFilterState} from "./_store/admin.state";

export interface AdminAuthSocket extends AuthSocket {}

export interface AdminDataSocket extends DataSocket {}

export interface AdminErrorSocket extends ErrorSocket {}

export interface AdminLogicSocket extends LogicSocket {}

export interface AdminRoutSocket extends RouteSocket {
	createContent: (contentType: ContentType) => Observable<boolean>;
}

export interface AdminStoreSocket extends StoreSocket {
	contentTypeState$: () => Observable<ContentTypeState>;
	contentFilterState$: () => Observable<ContentFilterState>;
	setContentType: (index: number) => Observable<void>;
	setFilter: (index: number) => Observable<void>;
}