import {globalHintMsgKeyPrefix, initialHeaderState} from "./header.state";
import {HeaderActions, HeaderActionTypes} from "./header.actions";

export const headerReducers = (
	state = initialHeaderState,
	action: HeaderActions
) => {
	switch(action.type) {
		case HeaderActionTypes.SetHintFromUrl:
			return {
				...state,
				// @ts-ignore
				globalHintMsgKey: updateHintFromUrl(action.payload.url)
			};
		case HeaderActionTypes.FlashHint:
		case HeaderActionTypes.ReplaceHint:
			return {
				...state,
				// @ts-ignore
				globalHintMsgKey: globalHintMsgKeyPrefix + action.payload.messageKey
			};
		default:
			return state;
	}
}

function updateHintFromUrl(url?: string) {
	let messageKey = '';
	if (url && url !== '/') {
		let array = url.split(/\//g);
		for (let i = 0, len = array.length; i < len; i++) {
			if (isNaN(Number(array[i]))) {
				messageKey = messageKey + array[i];
				if (i != len-1) {
					messageKey = messageKey + '.';
				}
			}
		}
		return globalHintMsgKeyPrefix + messageKey;
	}
}
