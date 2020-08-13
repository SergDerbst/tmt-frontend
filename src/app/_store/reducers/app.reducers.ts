import {ActionReducerMap} from "@ngrx/store";
import {AppState} from "../state/app.state";
import {headerReducer} from "../../main/header/_store/header.reducer";
import {contentReducer} from "../../contentFM/_store/content.reducer";

export const appReducers: ActionReducerMap<AppState, any> = {
	authState: undefined, //TODO the security state, cunt
	headerState: headerReducer,
	footerState: undefined, //TODO the footer state, bitch
	contentState: contentReducer
};