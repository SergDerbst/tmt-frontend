import {ActionReducerMap} from "@ngrx/store";
import {AppState} from "../state/app.state";
import {headerReducers} from "../../main/header/_store/header.reducers";

export const appReducers: ActionReducerMap<AppState, any> = {
	headerState: headerReducers,
	footerState: undefined, //TODO the footer state, bitch
	securityState: undefined, //TODO the security state, cunt
};