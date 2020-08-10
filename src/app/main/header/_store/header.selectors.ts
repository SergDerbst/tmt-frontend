import {AppState} from "../../../_store/state/app.state";
import {createSelector} from "@ngrx/store";
import {HeaderState} from "./header.state";

export const selectHeaderState = (appState: AppState) => appState.headerState;

export const selectGlobalHintMessageKey = createSelector(
	selectHeaderState,
	(headerState: HeaderState) => headerState.globalHintMsgKey);