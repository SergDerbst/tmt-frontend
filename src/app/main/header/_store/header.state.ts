export interface HeaderState {
	readonly globalHintMsgKey: string;
}

export const globalHintFlashingTime = 1500;
export const globalHintMsgKeyPrefix = 'app.header.hint.';
export const initialHeaderState: HeaderState = {
	globalHintMsgKey: globalHintMsgKeyPrefix + 'home'
}
