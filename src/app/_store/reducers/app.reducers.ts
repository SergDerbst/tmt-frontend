import {ActionReducerMap} from "@ngrx/store";
import {AppState} from "../state/app.state";
import {headerReducer} from "../../main/header/_store/header.reducer";
import {routerReducer} from "@ngrx/router-store";

export const appReducers: ActionReducerMap<AppState, any> = {
	routerState: routerReducer,
	authState: undefined, //TODO the security state, cunt
	headerState: headerReducer,
	footerState: undefined, //TODO the footer state, bitch
};