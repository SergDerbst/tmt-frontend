import {AppState} from "../../../_store/state/app.state";
import {createSelector} from "@ngrx/store";
import {HeaderState} from "./header.state";

export const headerState = (state) => state.headerState;

export const selectGlobalHintMessageKey = createSelector(
	headerState,
	(state) => state.globalHintMsgKey);