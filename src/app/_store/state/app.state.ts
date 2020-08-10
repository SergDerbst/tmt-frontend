/**
 * Rootstate of the whole TMT app.
 */
import {RouterReducerState} from "@ngrx/router-store";
import {HeaderState} from "../../main/header/_store/header.state";

export interface AppState {
	readonly routerState?: RouterReducerState;
	readonly headerState: HeaderState;
	readonly footerState: FooterState;
	readonly securityState: SecurityState;
}

/**
 * Global state for everything authentication, etc.
 */
export interface SecurityState {

}

/**
 * Base state for the ever visible application footer.
 */
export interface FooterState {

}

/**
 * Base state for the ever visible content.
 */
export interface ContentState {

}