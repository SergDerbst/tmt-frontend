import {globalHintMsgKeyPrefix, HeaderState, initialHeaderState} from './header.state';
import {HeaderActions, HeaderActionTypes} from './header.actions';
import {ActionReducer} from "@ngrx/store";
import {StrategicReducer} from "../../../_store/reducers/strategic.reducer";

const reducer = new StrategicReducer({
	[HeaderActionTypes.FlashHint]: replaceHint, // triggers effect with timeout
	[HeaderActionTypes.ReplaceHint]: replaceHint,
	[HeaderActionTypes.SetHintFromUrl]: hintFromUrl,
	__default__: (state, action) => initialHeaderState
});

export const headerReducer:ActionReducer<HeaderState> = (
	state = initialHeaderState,
	action: HeaderActions
) => {
	return reducer.reduce(state, action);
}

function replaceHint(state, action) {
	return {
		...state,
		globalHintMsgKey: globalHintMsgKeyPrefix + action.payload.messageKey
	};
}

function hintFromUrl(state, action) {
	return {
		...state,
		globalHintMsgKey: updateHintFromUrl(action.payload.url)
	};

	function updateHintFromUrl(url?: string) {
		let messageKey = '';
		if (url && url !== '/') {
			const array = url.split(/\//g);
			for (let i = 0, len = array.length; i < len; i++) {
				if (isNaN(Number(array[i]))) {
					messageKey = messageKey + array[i];
					if (i !== len-1) {
						messageKey = messageKey + '.';
					}
				}
			}
			return globalHintMsgKeyPrefix + messageKey;
		}
	}
}

