/**
 * Rootstate of the whole TMT app.
 */
import {RouterReducerState} from "@ngrx/router-store";
import {AuthState} from "../../authFM/_store/auth.state";
import {HeaderState} from "../../main/header/_store/header.state";
import {FooterState} from "../../main/footer/_store/footer.state";

export interface AppState {
	readonly routerState?: RouterReducerState;
	readonly authState: AuthState;
	readonly headerState: HeaderState;
	readonly footerState: FooterState;
}
export const initialAppState = {
	routerState: undefined,
	authState: undefined,
	headerState: undefined,
	footerState: undefined,
};
